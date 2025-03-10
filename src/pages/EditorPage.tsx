import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import {
  setWatermarkText,
  setWatermarkPosition,
  setWatermarkOpacity,
  setWatermarkColor,
  setWatermarkFontSize,
  setWatermarkRotation,
  setProcessedImage,
  resetWatermarkSettings,
  type WatermarkState,
} from '../store/watermarkSlice'
import {
  getWatermarkPositionStyle,
  generateWatermarkedImage,
  downloadImage,
} from '../utils/watermarkUtils'
import FrameSettings from '../components/FrameSettings'

const EditorPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    originalImage,
    watermarkText,
    watermarkPosition,
    watermarkOpacity,
    watermarkColor,
    watermarkFontSize,
    watermarkRotation,
    // 相框相关配置
    frameEnabled,
    frameColor,
    frameWidth,
    frameStyle,
    frameCaption,
    frameCaptionColor,
    frameCaptionPosition,
    frameCaptionFontSize,
    processedImage,
  } = useAppSelector(state => state.watermark)

  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'watermark' | 'frame'>('watermark')
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 如果没有原始图片，重定向到首页
    if (!originalImage) {
      navigate('/')
    }
  }, [originalImage, navigate])

  const handleGenerateWatermark = async () => {
    if (!imageContainerRef.current) return

    setIsGenerating(true)
    try {
      const dataUrl = await generateWatermarkedImage(imageContainerRef.current)
      dispatch(setProcessedImage(dataUrl))
    } catch (error) {
      console.error('生成水印图片失败:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!processedImage) return
    downloadImage(processedImage)
  }

  const handleReset = () => {
    dispatch(resetWatermarkSettings())
  }

  if (!originalImage) {
    return null
  }

  // 计算相框样式
  const frameContainerStyle = {
    padding: frameEnabled ? `${frameWidth}px` : '0',
    backgroundColor: 'transparent',
    border: frameEnabled
      ? `${frameWidth}px ${frameStyle} ${frameColor}`
      : 'none',
    boxSizing: 'border-box' as const,
    transition: 'all 0.3s ease',
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧：图片预览区域 */}
        <div className="lg:w-2/3">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">图片预览</h2>
            <div
              className="relative overflow-hidden rounded-lg"
              ref={imageContainerRef}
              style={frameContainerStyle}
            >
              {/* 顶部文字 */}
              {frameEnabled &&
                frameCaption &&
                frameCaptionPosition === 'top' && (
                  <div
                    className="text-center py-2"
                    style={{
                      color: frameCaptionColor,
                      fontSize: `${frameCaptionFontSize}px`,
                      fontWeight: 'bold',
                    }}
                  >
                    {frameCaption}
                  </div>
                )}

              {/* 图片和水印 */}
              <div className="relative">
                <img
                  src={originalImage}
                  alt="原始图片"
                  className="w-full h-auto"
                />
                <div
                  className={`absolute ${getWatermarkPositionStyle(watermarkPosition)} p-2 pointer-events-none`}
                  style={{
                    opacity: watermarkOpacity,
                    color: watermarkColor,
                    fontSize: `${watermarkFontSize}px`,
                    transform: `rotate(${watermarkRotation}deg)`,
                    transformOrigin: 'center',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  {watermarkText}
                </div>
              </div>

              {/* 底部文字 */}
              {frameEnabled &&
                frameCaption &&
                frameCaptionPosition === 'bottom' && (
                  <div
                    className="text-center py-2"
                    style={{
                      color: frameCaptionColor,
                      fontSize: `${frameCaptionFontSize}px`,
                      fontWeight: 'bold',
                    }}
                  >
                    {frameCaption}
                  </div>
                )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <button
              className="btn btn-primary flex-1"
              onClick={handleGenerateWatermark}
              disabled={isGenerating}
            >
              {isGenerating ? '生成中...' : '生成图片'}
            </button>
            <button className="btn btn-secondary flex-1" onClick={handleReset}>
              重置设置
            </button>
          </div>

          {processedImage && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">处理结果</h2>
              <div className="mb-4">
                <img
                  src={processedImage}
                  alt="处理后的图片"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={handleDownload}
              >
                下载图片
              </button>
            </div>
          )}
        </div>

        {/* 右侧：设置区域 */}
        <div className="lg:w-1/3">
          <div className="card sticky top-4">
            {/* 选项卡 */}
            <div className="flex border-b mb-6">
              <button
                className={`flex-1 py-2 font-medium ${activeTab === 'watermark' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('watermark')}
              >
                水印设置
              </button>
              <button
                className={`flex-1 py-2 font-medium ${activeTab === 'frame' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('frame')}
              >
                相框设置
              </button>
            </div>

            {/* 水印设置 */}
            {activeTab === 'watermark' && (
              <>
                <h2 className="text-xl font-semibold mb-6">水印设置</h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    水印文本
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={watermarkText}
                    onChange={e => dispatch(setWatermarkText(e.target.value))}
                    placeholder="输入水印文本"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    水印位置
                  </label>
                  <select
                    className="input"
                    value={watermarkPosition}
                    onChange={e =>
                      dispatch(
                        setWatermarkPosition(
                          e.target.value as WatermarkState['watermarkPosition'],
                        ),
                      )
                    }
                  >
                    <option value="topLeft">左上角</option>
                    <option value="topRight">右上角</option>
                    <option value="bottomLeft">左下角</option>
                    <option value="bottomRight">右下角</option>
                    <option value="center">中心</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    不透明度: {Math.round(watermarkOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    className="w-full"
                    value={watermarkOpacity}
                    onChange={e =>
                      dispatch(setWatermarkOpacity(parseFloat(e.target.value)))
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    水印颜色
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="w-10 h-10 rounded cursor-pointer"
                      value={watermarkColor}
                      onChange={e =>
                        dispatch(setWatermarkColor(e.target.value))
                      }
                    />
                    <input
                      type="text"
                      className="input"
                      value={watermarkColor}
                      onChange={e =>
                        dispatch(setWatermarkColor(e.target.value))
                      }
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    字体大小: {watermarkFontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    step="1"
                    className="w-full"
                    value={watermarkFontSize}
                    onChange={e =>
                      dispatch(setWatermarkFontSize(parseInt(e.target.value)))
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    旋转角度: {watermarkRotation}°
                  </label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="5"
                    className="w-full"
                    value={watermarkRotation}
                    onChange={e =>
                      dispatch(setWatermarkRotation(parseInt(e.target.value)))
                    }
                  />
                </div>
              </>
            )}

            {/* 相框设置 */}
            {activeTab === 'frame' && <FrameSettings />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorPage
