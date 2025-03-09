import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto card">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">页面未找到</h2>
        <p className="text-gray-600 mb-8">您访问的页面不存在或已被移除。</p>
        <Link to="/" className="btn btn-primary inline-block">
          返回首页
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
