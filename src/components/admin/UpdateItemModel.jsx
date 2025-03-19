import { useLocation, useNavigate } from "react-router-dom"
import handleInputData from "../../actions/handleInputData";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BackendApi from "../../api/BackendApi";

const UpdateItemModel = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const editItem = location.state
    const [itemDetails, setItemDetails] = useState({productId: editItem.productId, name: editItem.name, price: editItem.price, category: editItem.category, dimension: editItem.dimension, discription: editItem.discription, availability: editItem.availability, quantity: editItem.quantity, image: editItem.image})
    
    const handelSubmit = async(event) => {
        event.preventDefault()
        
        const token = localStorage.getItem('token')
        await BackendApi.put(`/products/${editItem.productId}`, itemDetails
        ).then((response) => {
            toast.success(response.data.message)
            navigate('/admin/items')
        }).catch((error) => {
            toast.error(error?.response?.data?.message || "Error Occured")
        })
    }
    return(
        <>
            <div className="backdrop-blur-sm flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full">
            <div className="p-4 w-[60%]">
                {/* <!-- Modal content --> */}
                <div className=" bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            <span className="text-3xl font-bold text-blue-600">Update</span> existing item
                        </h3>
                        <button type="button"
                        onClick={() => {navigate('/admin/items')}}
                        className="end-2.5 hover:cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={(event) => {handelSubmit(event)}}>
                            <div className="grid grid-cols-3 gap-5">
                                <div className="mb-3">
                                    <label htmlFor="productId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Id<span className="text-red-500">*</span></label>
                                    <input
                                    disabled
                                    value={itemDetails.productId}
                                    type="text" name="productId" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Id" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name<span className="text-red-500">*</span></label>
                                    <input 
                                    value={itemDetails.name}
                                    onChange={(event) => {handleInputData(event, setItemDetails)}}
                                    type="text" name="name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Name" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price<span className="text-red-500">*</span></label>
                                    <input 
                                    value={itemDetails.price}
                                    onChange={(event) => {handleInputData(event, setItemDetails)}}
                                    type="number" name="price" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Price" required/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                    <div className="mb-3">
                                        <label htmlFor="dimension" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Dimension<span className="text-red-500">*</span></label>
                                        <input
                                        value={itemDetails.dimension}
                                        onChange={(event) => {handleInputData(event, setItemDetails)}}
                                        type="text" name="dimension" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Dimension" required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Category<span className="text-red-500">*</span></label>
                                        <select
                                        value={itemDetails.category}
                                        onChange={(event) => {handleInputData(event, setItemDetails)}}
                                        name="category" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                            <option value="">Select Category</option>
                                            <option value="Speakers">Speaker</option>
                                            <option value="Blubs">Blubs</option>
                                            <option value="Mic">Mic</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="availability" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Availability<span className="text-red-500">*</span></label>
                                        <select 
                                        value={itemDetails.availability}
                                        onChange={(event) => {handleInputData(event, setItemDetails)}}
                                        name="availability" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                            <option value="">Select Availability</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Quantity<span className="text-red-500">*</span></label>
                                        <input 
                                        value={itemDetails.quantity}
                                        onChange={(event) => {handleInputData(event, setItemDetails)}}
                                        type="number" name="quantity" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Quantity" required/>
                                    </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="discription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Discription<span className="text-red-500">*</span></label>
                                <textarea 
                                value={itemDetails.discription}
                                onChange={(event) => {handleInputData(event, setItemDetails)}}
                                name="discription" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Discription"/>
                            </div>
                            <div className="flex justify-center items-center">
                                <button type="submit" className="bg-blue-600 rounded-xl w-[30%] h-[40px] font-bold text-white hover:cursor-pointer hover:bg-blue-700">Update Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UpdateItemModel