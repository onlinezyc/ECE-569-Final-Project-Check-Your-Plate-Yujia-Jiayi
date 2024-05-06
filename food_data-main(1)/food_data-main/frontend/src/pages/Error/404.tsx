import { useMount } from 'ahooks'

const NotFound = () => {
  useMount(() => {
    console.log('NotFound mounted')
  })
  return <>404</>
}

export default NotFound
