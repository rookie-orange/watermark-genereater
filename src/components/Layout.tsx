import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            照片水印生成器
          </Link>
          <nav>
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              首页
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>
            © {new Date().getFullYear()} 照片水印生成器 -
            一个简单易用的在线水印工具
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
