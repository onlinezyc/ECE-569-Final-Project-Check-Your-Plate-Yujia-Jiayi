import { Navigate, createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout/layout'
import { lazy } from 'react'
const Home = lazy(() => import('@/pages/Home'))
const NotFound = lazy(() => import('@/pages/Error/404'))
const Login = lazy(() => import('@/pages/Login'))
const Registration = lazy(() => import('@/pages/Login/register'))
const Food = lazy(() => import('@/pages/Home/food'))
const Nutrient = lazy(() => import('@/pages/Home/nutrient'))
const Profile = lazy(() => import('@/pages/Profile'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" />,
      },
      {
        path: '/home',
        element: <Home />,
        handle: {
          title: '首页',
        },
      },
      {
        path: '/food',
        element: <Food />,
        handle: {
          title: '食物列表',
        },
      },
      {
        path: '/nutrient',
        element: <Nutrient />,
        handle: {
          title: '营养成分',
        },
      },
      {
        path: '/profile',
        element: <Profile />,
        handle: {
          title: '个人中心',
        },
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Registration />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
])
export default router
