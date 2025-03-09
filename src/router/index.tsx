import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout"
import HomePage from "../pages/HomePage"
import EditorPage from "../pages/EditorPage"
import NotFoundPage from "../pages/NotFoundPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "editor",
        element: <EditorPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
])
