import { useState } from 'react'
import axios from 'axios'
import { useLocalStorageState } from 'ahooks'

const Registration = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useLocalStorageState('userId', {
    defaultValue: 0,
  })
  const handleRegister = () => {
    if (!username || !password || !email) {
      setMessage('Please fill in all fields.')
      return
    }
    axios
      .post('/api/register', { username, password, email})
      .then(res => {
        if (res.data.success) {
          setMessage('Registration successful!')
          setUserId(res.data.data.id)
          window.location.href = '/home'
        } else {
          setMessage(res.data.msg)
        }
      })
      .catch(error => {
        console.error('Error occurred during registration:', error)
        setMessage(
          'An error occurred during registration. Please try again later.'
        )
      })
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 to-indigo-600">
      <div className="w-1/4  p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
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
        <div className="mb-4">
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        {/* <div className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div> */}
        <div className="mb-4 text-red-500">{message}</div>
        <div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => (window.location.href = '/login')}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Registration
