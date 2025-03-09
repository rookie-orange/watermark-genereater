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
  setProcessedImage,
  resetWatermarkSettings,
  resetAll,
} = watermarkSlice.actions

export default watermarkSlice.reducer
