/* eslint-disable camelcase */
import { useState } from 'react'
import { useMount } from 'ahooks'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './recipe.scss'
const Recipe = () => {
  const [data, setData] = useState([
    {
      id: 1,
      description: '',
      name: 'Loki',
      author: 'Loki',
      create_time: '2022-04-20 00:00:00',
    },
  ])

  const [newData, setNewData] = useState({
    name: '',
    description: '',
    author: '',
  })

  const navigate = useNavigate()
  const handleAdd = () => {
    document.getElementById('add')?.showModal()
  }

  const View = (id = 0) => {
    navigate(`/food?id=${id}`)
  }

  useMount(() => {
    getData()
  })

  const getData = () => {
    axios
      .post('/api/get_recipe')
      .then(res => {
        setData(res.data.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  return (
    <>
      <div className="w-full h-14 flex justify-between">
        <p className="text-3xl font-bold">Recipe List</p>
        <div className="tooltip z-10 tooltip-bottom" data-tip="add a new">
          <button className="btn btn-info" onClick={handleAdd}>
            Add One
          </button>
        </div>
      </div>
      <dialog id="add" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Recipe</h3>
          <p className="py-4">
            Please fill in the form below to add a new recipe.
          </p>
          <div className="modal-action grid grid-flow-row-dense grid-cols-1">
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Name"
                value={newData.name}
                onChange={e =>
                  setNewData({
                    ...newData,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Description"
                value={newData.description}
                onChange={e =>
                  setNewData({
                    ...newData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Author"
                value={newData.author}
                onChange={e =>
                  setNewData({
                    ...newData,
                    author: e.target.value,
                  })
                }
              />
            </div>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div>
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  if (
                    !newData.name ||
                    !newData.description ||
                    !newData.author
                  ) {
                    alert('Please fill in the form')
                    return
                  }
                  axios
                    .post('/api/add_recipe', newData)
                    .then(res => {
                      if (res.data.success) {
                        getData()
                        document.getElementById('add')?.close()
                        setNewData({
                          name: '',
                          description: '',
                          author: '',
                        })
                      }
                    })
                    .catch(error => {
                      console.log('error', error)
                    })
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <div className="overflow-x-auto w-full m-auto">
        <table className="table table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>Index</th>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>CreateTime</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    <div className="badge badge-neutral badge-outline">
                      {item.author}
                    </div>
                  </td>

                  <td>{item.create_time}</td>
                  <th>
                    <button
                      onClick={() => View(item.id)}
                      className="btn btn-active btn-sm  btn-primary"
                    >
                      View this recipe
                    </button>
                  </th>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>CreateTime</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}

export default Recipe
