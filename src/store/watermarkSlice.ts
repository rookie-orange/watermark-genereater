import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface WatermarkState {
  originalImage: string | null
  watermarkText: string
  watermarkPosition:
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'center'
  watermarkOpacity: number
  watermarkColor: string
  watermarkFontSize: number
  watermarkRotation: number
  // 相框相关配置
  frameEnabled: boolean
  frameColor: string
  frameWidth: number
  frameStyle: 'solid' | 'dashed' | 'dotted' | 'double'
  frameCaption: string
  frameCaptionColor: string
  frameCaptionPosition: 'top' | 'bottom'
  frameCaptionFontSize: number
  processedImage: string | null
}

const initialState: WatermarkState = {
  originalImage: null,
  watermarkText: '水印文本',
  watermarkPosition: 'bottomRight',
  watermarkOpacity: 0.5,
  watermarkColor: '#000000',
  watermarkFontSize: 24,
  watermarkRotation: 0,
  // 相框相关配置初始值
  frameEnabled: false,
  frameColor: '#000000',
  frameWidth: 10,
  frameStyle: 'solid',
  frameCaption: '',
  frameCaptionColor: '#000000',
  frameCaptionPosition: 'bottom',
  frameCaptionFontSize: 16,
  processedImage: null,
}

export const watermarkSlice = createSlice({
  name: 'watermark',
  initialState,
  reducers: {
    setOriginalImage: (state, action: PayloadAction<string>) => {
      state.originalImage = action.payload
      state.processedImage = null // 重置处理后的图片
    },
    setWatermarkText: (state, action: PayloadAction<string>) => {
      state.watermarkText = action.payload
    },
    setWatermarkPosition: (
      state,
      action: PayloadAction<WatermarkState['watermarkPosition']>,
    ) => {
      state.watermarkPosition = action.payload
    },
    setWatermarkOpacity: (state, action: PayloadAction<number>) => {
      state.watermarkOpacity = action.payload
    },
    setWatermarkColor: (state, action: PayloadAction<string>) => {
      state.watermarkColor = action.payload
    },
    setWatermarkFontSize: (state, action: PayloadAction<number>) => {
      state.watermarkFontSize = action.payload
    },
    setWatermarkRotation: (state, action: PayloadAction<number>) => {
      state.watermarkRotation = action.payload
    },
    // 相框相关 reducers
    setFrameEnabled: (state, action: PayloadAction<boolean>) => {
      state.frameEnabled = action.payload
    },
    setFrameColor: (state, action: PayloadAction<string>) => {
      state.frameColor = action.payload
    },
    setFrameWidth: (state, action: PayloadAction<number>) => {
      state.frameWidth = action.payload
    },
    setFrameStyle: (
      state,
      action: PayloadAction<WatermarkState['frameStyle']>,
    ) => {
      state.frameStyle = action.payload
    },
    setFrameCaption: (state, action: PayloadAction<string>) => {
      state.frameCaption = action.payload
    },
    setFrameCaptionColor: (state, action: PayloadAction<string>) => {
      state.frameCaptionColor = action.payload
    },
    setFrameCaptionPosition: (
      state,
      action: PayloadAction<WatermarkState['frameCaptionPosition']>,
    ) => {
      state.frameCaptionPosition = action.payload
    },
    setFrameCaptionFontSize: (state, action: PayloadAction<number>) => {
      state.frameCaptionFontSize = action.payload
    },
    setProcessedImage: (state, action: PayloadAction<string>) => {
      state.processedImage = action.payload
    },
    resetWatermarkSettings: state => {
      return {
        ...initialState,
        originalImage: state.originalImage,
      }
    },
    resetAll: () => initialState,
  },
})

export const {
  setOriginalImage,
  setWatermarkText,
  setWatermarkPosition,
  setWatermarkOpacity,
  setWatermarkColor,
  setWatermarkFontSize,
  setWatermarkRotation,
  // 相框相关 actions
  setFrameEnabled,
  setFrameColor,
  setFrameWidth,
  setFrameStyle,
  setFrameCaption,
  setFrameCaptionColor,
  setFrameCaptionPosition,
  setFrameCaptionFontSize,
  setProcessedImage,
  resetWatermarkSettings,
  resetAll,
} = watermarkSlice.actions

export default watermarkSlice.reducer
