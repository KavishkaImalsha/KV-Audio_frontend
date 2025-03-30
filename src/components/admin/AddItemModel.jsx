import { useState } from "react";
import handleInputData from "../../actions/handleInputData"
import { FcAddImage } from "react-icons/fc";

const AddItemModel = ({showModel, setItem, submitForm, setProductImages}) => {
    return(
        <>

        <div className="backdrop-blur-sm flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full">
            <div className="p-4 w-[60%] max-h-[95vh] flex justify-center items-center">
                {/* <!-- Modal content --> */}
                <div className=" bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            <span className="text-3xl font-bold text-blue-600">Add</span> new item
                        </h3>
                        <button type="button" 
                        onClick={() => {showModel(false)}}
                        className="end-2.5 hover:cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-4 md:p-5  overflow-y-auto max-h-[85vh]">
                        <form className="space-y-4" onSubmit={(event) => {submitForm(event)}}>
                            <div>   
                                <div class="flex items-center justify-center w-full">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" class="hidden" multiple onChange={(event) => {setProductImages([event.target.files])}}/>
                                    </label>
                                </div> 
                            </div>
                            <div className="grid grid-cols-3 gap-5">
                                <div className="mb-3">
                                    <label htmlFor="productId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Id<span className="text-red-500">*</span></label>
                                    <input 
                                    onChange={(event) => {handleInputData(event, setItem)}}
                                    type="text" name="productId" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Id" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name<span className="text-red-500">*</span></label>
                                    <input 
                                    onChange={(event) => {handleInputData(event, setItem)}}
                                    type="text" name="name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Name" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price<span className="text-red-500">*</span></label>
                                    <input 
                                    onChange={(event) => {handleInputData(event, setItem)}}
                                    type="number" name="price" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Price" required/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                    <div className="mb-3">
                                        <label htmlFor="dimension" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Dimension<span className="text-red-500">*</span></label>
                                        <input 
                                        onChange={(event) => {handleInputData(event, setItem)}}
                                        type="text" name="dimension" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Dimension" required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Category<span className="text-red-500">*</span></label>
                                        <select 
                                        onChange={(event) => {handleInputData(event, setItem)}}
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
                                        onChange={(event) => {handleInputData(event, setItem)}}
                                        name="availability" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                            <option value="">Select Availability</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Quantity<span className="text-red-500">*</span></label>
                                        <input 
                                        onChange={(event) => {handleInputData(event, setItem)}}
                                        type="number" name="quantity" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Quantity" required/>
                                    </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="discription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Discription<span className="text-red-500">*</span></label>
                                <textarea 
                                onChange={(event) => {handleInputData(event, setItem)}}
                                name="discription" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Discription"/>
                            </div>
                            <div className="flex justify-center items-center">
                                <button type="submit" className="bg-blue-600 rounded-xl w-[30%] h-[40px] font-bold text-white hover:cursor-pointer hover:bg-blue-700">Add Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 

        </>
    )
}

export default AddItemModel