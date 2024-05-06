import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorageState, useTitle } from 'ahooks'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [userId, setUserId] = useLocalStorageState('userId', {
    defaultValue: 0,
  })
  useTitle('Please Login')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (!username || !password) {
      alert('Please enter username and password!')
      return
    }
    axios
      .post('/api/login', { username, password })
      .then(res => {
        if (res.data.success) {
          setUserId(res.data.data.id)
          navigate('/home')
        } else {
          alert(res.data.msg)
        }
      })
      .catch(error => {
        console.error('Error occurred during login:', error)
        alert('An error occurred during login. Please try again later.')
      })
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
      <div className="w-1/4 p-8 bg-white rounded-lg shadow-lg">
        <h2 className=" text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4 ">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            className="w-2/5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="w-2/5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
