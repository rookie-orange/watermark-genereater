import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import {
  setFrameEnabled,
  setFrameColor,
  setFrameWidth,
  setFrameStyle,
  setFrameCaption,
  setFrameCaptionColor,
  setFrameCaptionPosition,
  setFrameCaptionFontSize,
  type WatermarkState,
} from '../store/watermarkSlice'

const FrameSettings = () => {
  const dispatch = useAppDispatch()
  const {
    frameEnabled,
    frameColor,
    frameWidth,
    frameStyle,
    frameCaption,
    frameCaptionColor,
    frameCaptionPosition,
    frameCaptionFontSize,
  } = useAppSelector(state => state.watermark)

  return (
    <div className="card mt-6">
      <h2 className="text-xl font-semibold mb-6">相框设置</h2>

      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="frame-enabled"
            className="mr-2 h-4 w-4"
            checked={frameEnabled}
            onChange={e => dispatch(setFrameEnabled(e.target.checked))}
          />
          <label
            htmlFor="frame-enabled"
            className="text-sm font-medium text-gray-700"
          >
            启用相框
          </label>
        </div>
      </div>

      {frameEnabled && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              相框颜色
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="w-10 h-10 rounded cursor-pointer"
                value={frameColor}
                onChange={e => dispatch(setFrameColor(e.target.value))}
              />
              <input
                type="text"
                className="input"
                value={frameColor}
                onChange={e => dispatch(setFrameColor(e.target.value))}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              相框宽度: {frameWidth}px
            </label>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              className="w-full"
              value={frameWidth}
              onChange={e => dispatch(setFrameWidth(parseInt(e.target.value)))}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              相框样式
            </label>
            <select
              className="input"
              value={frameStyle}
              onChange={e =>
                dispatch(
                  setFrameStyle(e.target.value as WatermarkState['frameStyle']),
                )
              }
            >
              <option value="solid">实线</option>
              <option value="dashed">虚线</option>
              <option value="dotted">点线</option>
              <option value="double">双线</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              相框文字
            </label>
            <input
              type="text"
              className="input"
              value={frameCaption}
              onChange={e => dispatch(setFrameCaption(e.target.value))}
              placeholder="输入相框文字"
            />
          </div>

          {frameCaption && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  文字颜色
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className="w-10 h-10 rounded cursor-pointer"
                    value={frameCaptionColor}
                    onChange={e =>
                      dispatch(setFrameCaptionColor(e.target.value))
                    }
                  />
                  <input
                    type="text"
                    className="input"
                    value={frameCaptionColor}
                    onChange={e =>
                      dispatch(setFrameCaptionColor(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  文字位置
                </label>
                <select
                  className="input"
                  value={frameCaptionPosition}
                  onChange={e =>
                    dispatch(
                      setFrameCaptionPosition(
                        e.target
                          .value as WatermarkState['frameCaptionPosition'],
                      ),
                    )
                  }
                >
                  <option value="top">顶部</option>
                  <option value="bottom">底部</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  文字大小: {frameCaptionFontSize}px
                </label>
                <input
                  type="range"
                  min="10"
                  max="36"
                  step="1"
                  className="w-full"
                  value={frameCaptionFontSize}
                  onChange={e =>
                    dispatch(setFrameCaptionFontSize(parseInt(e.target.value)))
                  }
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default FrameSettings
