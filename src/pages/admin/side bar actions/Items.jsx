import { IoAddCircleSharp } from "react-icons/io5"
import { useEffect, useState } from "react"
import AddItemModel from "../../../components/admin/AddItemModel"
import axios from "axios"
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import GridLoader from "react-spinners/GridLoader"
import Swal from 'sweetalert2'
import BackendApi from "../../../api/BackendApi"
import UploadMediaFiles from "../../../actions/UplodMediaFiles"

const Items = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [itemDetails, setItemDetails] = useState({productId: "", name: "", price: 0, category: "", dimension: "", discription: "", availability: "", quantity: "", image: [null]})
    const [productImages, setProductImages] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [itemsLoading, setItemsLoading] = useState(false)
    
    useEffect(() => {
        if(!itemsLoading){
            fetchAllProducts()
        }
    }, [itemsLoading])

    const fetchAllProducts = async() => {
        await BackendApi.get(`/products`).then((response) => {
            setProducts(response.data)
            setItemsLoading(true)
        }).catch((error) => {
            toast.error(error?.response?.data?.message || "Error Occured")
        })
    }

    const deleteItem = (itemId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                await BackendApi.delete(`/products/${itemId}`).then((response) => {
                    toast.success(response.data.message)
                    setItemsLoading(false)
                }).catch((error) => {
                    toast.error(error?.response?.data?.message || "Error Occured")
                })
            }
          })
    }

    const updateItem = (product) => {
        navigate('/admin/edit-item', {state: product})
    }

    const addImages = async() => {
        const promises = []

        productImages.map((productImage) => {
            const promise = UploadMediaFiles(productImage[0])
            promises.push(promise) 
        })

        await Promise.all(promises).then((result) => {
            setItemDetails((prevState) => ({
                ...prevState,
                image : result
            }))  
        }).catch((error) => {
            toast.error(error)
        })
        
    }
    

    const handelSubmit = async(event) => {
        event.preventDefault()
        if(productImages.length != 0){
            await addImages()
        }
        
        await BackendApi.post(`/products`, itemDetails).then((response) => {
            toast.success(response.data.message)
            setIsModalVisible(false)
            setItemsLoading(false)
            navigate('/admin/items')
        }).catch((error) => {
            toast.error(error?.response?.data?.message || "Error Occured")
        })
    }
    
    return(
    <>
        <div className={`w-full h-full relative`}>
            <button onClick={() => {setIsModalVisible(true)}}>
                <IoAddCircleSharp className="text-7xl text-blue-600 fixed right-4 bottom-4 hover:text-blue-700 hover:cursor-pointer"/>
            </button>
            {isModalVisible && <AddItemModel showModel={setIsModalVisible} setItem={setItemDetails} submitForm={handelSubmit} setProductImages={setProductImages}/>}
            {itemsLoading ? (
                <div className="shadow-md sm:rounded-lg w-full">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Unit Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                dimension
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Availability
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => {
                            return(
                                <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {product.productId}
                                    </th>
                                    <td className="px-6 py-4">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.dimension}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.discription}
                                    </td>
                                    <td className={`px-6 py-4 ${product.availability ? "text-green-600" : "text-red-600"}`}>
                                        {product.availability ? "Yes" : "No"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.quantity}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => {updateItem(product)}} className="hover:cursor-pointer font-medium text-blue-600 hover:underline">Edit</button>|
                                        <button onClick={() => {deleteItem(product._id)}} className="hover:cursor-pointer font-medium text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            ) : (<div className="flex justify-center"><GridLoader color="#2563eb" /></div>)}
        </div>
    </>
 )
}
export default Items