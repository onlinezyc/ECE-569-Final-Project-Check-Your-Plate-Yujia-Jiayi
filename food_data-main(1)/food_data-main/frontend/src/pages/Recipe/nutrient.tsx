/* eslint-disable camelcase */
import { useState } from 'react'
import './home.scss'
import { useMount } from 'ahooks'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
export default () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: '',
      amount: '',
      nutrient_nbr: '',
      unit_name: '',
      rank: 0,
    },
  ])
  const [newData, setNewData] = useState({
    name: '',
    description: '',
    author: '',
  })
  const navigate = useNavigate()
  const [params] = useSearchParams()
  useMount(() => {
    // 获取params 的id
    if (!params.get('id')) {
      alert('参数错误')
      navigate('/home')
    }
    getData()
  })
  const getData = () => {
    axios
      .post('/api/get_food_nutrient', {
        fdc_id: Number(params.get('id')),
      })
      .then(res => {
        setData(res.data.data)
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  return (
    <>
      <div className="w-full h-14 flex justify-start">
        <p className="text-3xl font-bold">Nutrient List</p>
      </div>

      <div className="overflow-x-auto w-full m-auto">
        <table className="table  table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>Index</th>
              <th>ID</th>
              <th>Name</th>
              <th>Amount</th>
              <th>NutrientNbr</th>
              <th>UnitName</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <th>{item.id}</th>
                  <td>
                    <div className="badge badge-primary badge-outline">
                      {item.name}
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-md">{item.amount}</div>
                  </td>
                  <td>
                    <div className="badge badge-accent badge-outline">
                      {item.nutrient_nbr}
                    </div>
                  </td>
                  <td>{item.unit_name}</td>
                  <td>{item.rank}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Index</th>
              <th>ID</th>
              <th>Name</th>
              <th>Amount</th>
              <th>NutrientNbr</th>
              <th>UnitName</th>
              <th>Rank</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}
