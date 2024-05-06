import { Navigate, createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout/layout'
import { lazy } from 'react'
const Home = lazy(() => import('@/pages/Home'))
const Recipe = lazy(() => import('@/pages/Recipe'))
const NotFound = lazy(() => import('@/pages/Error/404'))
const Login = lazy(() => import('@/pages/Login'))
const Registration = lazy(() => import('@/pages/Login/register'))
const Foods = lazy(() => import('@/pages/Foods'))
const Nutrients = lazy(() => import('@/pages/Nutrients/Nutrients'))
const Profile = lazy(() => import('@/pages/Profile'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" />,  // change back
      },
      {
        path: '/home',
        element: <Home />,
        handle: {
          title: 'Landing Page',
        },
      },
      {
        path: '/foods',
        element: <Foods />,
        handle: {
          title: 'Food Nutrient Data Base',
        },
      },
      {
        path: '/nutrients',
        element: <Nutrients />,
        handle: {
          title: 'Nutrient Database',
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
        path: '/profile',
        element: <Profile />,
        handle: {
          title: 'user-profile',
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
