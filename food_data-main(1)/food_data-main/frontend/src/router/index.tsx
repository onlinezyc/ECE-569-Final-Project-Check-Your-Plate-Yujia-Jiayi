import { Navigate, createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout/layout'
import { lazy } from 'react'
const Home = lazy(() => import('@/pages/Home'))
const Recipe = lazy(() => import('@/pages/Recipe'))
const NotFound = lazy(() => import('@/pages/Error/404'))
const Login = lazy(() => import('@/pages/Login'))
const Registration = lazy(() => import('@/pages/Login/register'))
const Food = lazy(() => import('@/pages/Recipe/food'))
const Nutrient = lazy(() => import('@/pages/Recipe/nutrient'))
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
          title: 'Landing Page',
        },
      },
      {
        path: '/recipes',
        element: <Recipe />,
        handle: {
          title: 'Recipe Database',
        },
      },
      {
        path: '/food',
        element: <Food />,
        handle: {
          title: 'Food List',
        },
      },
      {
        path: '/nutrient',
        element: <Nutrient />,
        handle: {
          title: 'Nutrients',
        },
      },
      {
        path: '/profile',
        element: <Profile />,
        handle: {
          title: 'User Profile',
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
