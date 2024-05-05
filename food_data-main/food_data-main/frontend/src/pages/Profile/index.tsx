/* eslint-disable camelcase */
import { useMount, useLocalStorageState } from 'ahooks'
import axios from 'axios'
import { useState } from 'react'

export default () => {
  const [userId, setUserId] = useLocalStorageState('userId', {
    defaultValue: 0,
  })
  useMount(() => {
    console.log('Profile mounted')
    if (!userId || userId === 0) {
      //   setUserInfo
      window.location.href = '/login'
    }
    getUser()
  })
  const [user, setUser] = useState({
    username: 'admin',
    password: '123456',
    email: 'admin@example.com',
    phone: '12345678901',
    sex: '男',
    age: 18,
    height: 180,
    weight: 60,
    blood_pressure: '120/80',
    diabetes: 'true',
    pregnancy: 'false',
  })
  const getUser = () => {
    axios
      .post('/api/get_user', {
        id: userId,
      })
      .then(res => {
        console.log(res.data.success)
        if (!res.data.success) {
          window.location.href = '/login'
        }
        setUser(res.data.data.fields)
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  const updateUser = () => {
    axios
      .post('/api/update_user', {
        id: userId,
        ...user,
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mt-10 px-5 py-5 bg-white rounded-lg shadow-lg">
        <div className="grid grid-flow-row-dense grid-cols-2">
          <div className="m-3 col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              value={user.username}
              readOnly
            />
          </div>
          <div className="m-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="m-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="m-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              value={user.phone}
              onChange={e => setUser({ ...user, phone: e.target.value })}
            />
          </div>
          <div className="m-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sex
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              value={user.sex}
              onChange={e => setUser({ ...user, sex: e.target.value })}
            >
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          <div className="m-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Age
            </label>
            <input
              type="number"
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              value={user.age}
              onChange={e => setUser({ ...user, age: Number(e.target.value) })}
            />
          </div>
          <div className="m-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Height
            </label>
            <input
              type="number"
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              value={user.height}
              onChange={e =>
                setUser({ ...user, height: Number(e.target.value) })
              }
            />
          </div>
          <div className="m-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Weight
            </label>
            <input
              type="number"
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              value={user.weight}
              onChange={e =>
                setUser({ ...user, weight: Number(e.target.value) })
              }
            />
          </div>
          <div className="m-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              blood_pressure
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              value={user.blood_pressure}
              onChange={e =>
                setUser({ ...user, blood_pressure: e.target.value })
              }
            />
          </div>
          <div className="m-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Diabetes
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              value={user.diabetes}
              onChange={e => setUser({ ...user, diabetes: e.target.value })}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="m-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Pregnancy
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              value={user.pregnancy}
              onChange={e => setUser({ ...user, pregnancy: e.target.value })}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <button
            className="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={updateUser}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}
