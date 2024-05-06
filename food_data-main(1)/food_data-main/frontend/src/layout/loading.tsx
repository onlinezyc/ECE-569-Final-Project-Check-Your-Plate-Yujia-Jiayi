import './loading.scss'
import { useMount } from 'ahooks'
const Loading = () => {
  useMount(() => {
    console.log('loading')
  })
  return <>loading...</>
}

export default Loading
