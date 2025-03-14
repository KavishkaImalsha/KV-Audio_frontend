import { IoAddCircleSharp } from "react-icons/io5"
import { useState } from "react"
import AddItemModel from "../../../components/admin/AddItemModel"
import axios from "axios"
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"

const Items = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [itemDetails, setItemDetails] = useState({productId: "", name: "", price: 0, category: "", dimension: "", discription: "", availability: "", quantity: "", image: [null]})
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    
    const handelSubmit = async(event) => {
        event.preventDefault()
        await axios.post('http://localhost:3000/api/products', itemDetails, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            toast.success(response.data.message)
            setIsModalVisible(false)
            navigate('/admin/items')
        }).catch((error) => {
            toast.error(error.response.data.error)
        })
    }
    
    return(
    <>
        <div className={`w-full h-full relative`}>
            <button onClick={() => {setIsModalVisible(true)}}>
                <IoAddCircleSharp className="text-7xl text-blue-600 fixed right-4 bottom-4 hover:text-blue-700 hover:cursor-pointer"/>
            </button>

            {isModalVisible && <AddItemModel showModel={setIsModalVisible} setItem={setItemDetails} submitForm={handelSubmit}/>}
        </div>
    </>
 )
}
export default Items