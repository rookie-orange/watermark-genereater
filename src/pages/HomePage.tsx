import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { setOriginalImage } from "../store/watermarkSlice"

const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        dispatch(setOriginalImage(event.target.result))
        navigate("/editor")
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        dispatch(setOriginalImage(event.target.result))
        navigate("/editor")
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">照片水印生成器</h1>
          <p className="text-xl text-gray-600">
            上传照片，添加自定义水印，一键下载
          </p>
        </div>

        <div
          className="card flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => document.getElementById("file-upload")?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h2 className="text-xl font-semibold mb-2">点击或拖拽上传照片</h2>
          <p className="text-gray-500 text-center mb-4">支持 JPG、PNG 格式</p>
          <button className="btn btn-primary">选择图片</button>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">功能特点</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="text-blue-600 mb-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">自定义水印</h4>
              <p className="text-gray-600">
                自由设置水印文字、位置、透明度、颜色和大小
              </p>
            </div>
            <div className="card">
              <div className="text-blue-600 mb-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">一键下载</h4>
              <p className="text-gray-600">生成水印后，一键下载处理后的图片</p>
            </div>
            <div className="card">
              <div className="text-blue-600 mb-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2">安全可靠</h4>
              <p className="text-gray-600">
                所有处理在本地完成，不会上传您的照片到服务器
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
