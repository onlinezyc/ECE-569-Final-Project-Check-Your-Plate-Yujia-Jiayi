/* eslint-disable camelcase */
import {useState} from 'react'
import './home.scss'
import {useMount} from 'ahooks'
import axios from 'axios'
import {useNavigate, useSearchParams} from 'react-router-dom'

 () => {
    const [data, setData] = useState([
        {
            fdc_id: 1,
            data_type: '',
            description: '',
            amount: 0,
            food_category_id: 0,
            publication_date: '2022-04-20',
        },
    ])
    const [foods, setFoods] = useState([
        {
            fdc_id: 1,
            description: '',
            food_category_id: '',
            publication_date: '',
        },
    ])
    const [search, setSearch] = useState('')
    const [recipeId, setRecipeId] = useState(0)
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()
    const handleAdd = () => {
        handleSearch()
        document.getElementById('add')?.showModal()
    }
    const handleSearch = () => {
        axios
            .post('/api/search_food', {
                search,
            })
            .then(res => {
                setFoods(res.data.data)
            })
            .catch(error => {
                console.log('error', error)
            })
    }
    const View = (id = 0) => {
        navigate(`/nutrient?id=${id}`)
    }
    const [params] = useSearchParams()
    useMount(() => {
        // 获取params 的id
        if (!params.get('id')) {
            alert('参数错误')
            navigate('/home')
        }
        setRecipeId(Number(params.get('id')))
        getData()
    })
    const Add = (id: number) => {
        axios
            .post('/api/add_recipe_food', {
                recipe_id: recipeId,
                fdc_id: id,
                amount: amount,
            })
            .then(res => {
                console.log(res.data)
                getData()
                // document.getElementById('add')?.close()
            })
            .catch(error => {
                console.log('error', error)
                alert(error)
            })
    }
    const getData = () => {
        axios
            .post('/api/get_recipe_food', {
                recipe_id: Number(params.get('id')),
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
            <div className="w-full h-14 flex justify-between">
                <p className="text-3xl font-bold">Food List</p>
                <button className="btn btn-info " onClick={handleAdd}>
                    Add Food
                </button>
            </div>
            <dialog id="add" className="modal ">
                <div className="w-3/4 max-w-5xl	 modal-box flex flex-col justify-normal ">
                    <h3 className="font-bold text-lg">Add Food</h3>
                    <p className="py-4">Please fill in the following information.</p>
                    <div className="join w-full">
                        <input
                            className="input input-bordered join-item"
                            placeholder="Food Name"
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button className="btn join-item " onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                    <p className="py-4">
                        Set Food Amount
                    </p>
                    <input
                        className="input input-bordered "
                        placeholder="Amount"
                        type="number"
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                    <div className="modal-action overflow-y-auto h-96">
                        <table className="table table-xs table-pin-rows table-pin-cols">
                            <thead>
                            <tr>
                                <th>Index</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>foodCategoryId</th>
                                <th>PublicationDate</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {foods.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{item.fdc_id}</td>
                                        <td>{item.description}</td>
                                        <td>{item.food_category_id}</td>
                                        <td>{item.publication_date}</td>
                                        <td>
                                            <button
                                                onClick={() => Add(item.fdc_id)}
                                                className="btn btn-active  btn-primary btn-xs"
                                            >
                                                Add this food to recipe
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={() => document.getElementById('add')?.close()}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </dialog>

            <div className="overflow-x-auto w-full m-auto">
                <table className="table  table-pin-rows table-pin-cols">
                    <thead>
                    <tr>
                        <th>Index</th>
                        <th>FoodID</th>
                        <th>DataType</th>
                        <th>FoodName</th>
                        <th>Amount</th>
                        <th>foodCategoryID</th>
                        <th>PublicationDate</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{item.fdc_id}</td>
                                <td>{item.data_type}</td>
                                <td>{item.description}</td>
                                <td>{item.amount}</td>
                                <td>{item.food_category_id}</td>
                                <td>{item.publication_date}</td>
                                <th>
                                    <button
                                        onClick={() => View(item.fdc_id)}
                                        className="btn btn-active  btn-primary btn-sm"
                                    >
                                        View this food
                                    </button>
                                </th>
                            </tr>
                        )
                    })}
                    </tbody>
                    <tfoot>
                    <tr>
                        <th>Index</th>
                        <th>FoodID</th>
                        <th>DataType</th>
                        <th>FoodName</th>
                        <th>Amount</th>
                        <th>FoodCategoryID</th>
                        <th>PublicationDate</th>
                        <th>Action</th>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default Food