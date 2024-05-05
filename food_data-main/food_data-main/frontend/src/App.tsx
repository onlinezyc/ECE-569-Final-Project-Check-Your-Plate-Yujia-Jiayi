import { useMount } from 'ahooks'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { Suspense } from 'react'
import Loading from './layout/loading'
import './App.css'
import './App.scss'
const App = () => {
  useMount(() => {
    console.log('App mounted')
  })
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
