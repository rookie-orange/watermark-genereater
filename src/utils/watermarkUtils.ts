import { toJpeg } from 'html-to-image'
import { saveAs } from 'file-saver'
import type { WatermarkState } from '../store/watermarkSlice'

/**
 * 根据水印位置返回对应的CSS类名
 */
export const getWatermarkPositionStyle = (
  position: WatermarkState['watermarkPosition'],
): string => {
  switch (position) {
    case 'topLeft':
      return 'top-4 left-4'
    case 'topRight':
      return 'top-4 right-4'
    case 'bottomLeft':
      return 'bottom-4 left-4'
    case 'bottomRight':
      return 'bottom-4 right-4'
    case 'center':
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    default:
      return 'bottom-4 right-4'
  }
}

/**
 * 生成带水印的图片
 */
export const generateWatermarkedImage = async (
  element: HTMLElement,
  options = { quality: 0.95 },
): Promise<string> => {
  try {
    return await toJpeg(element, options)
  } catch (error) {
    console.error('生成水印图片失败:', error)
    throw error
  }
}

/**
 * 下载图片
 */
export const downloadImage = (imageUrl: string, filename?: string): void => {
  const name = filename || `watermarked_image_${new Date().getTime()}.jpg`
  saveAs(imageUrl, name)
}
