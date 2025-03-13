const AddItemModel = ({showModel}) => {
    return(
        <>

        <div className="fixed right-[-30%] justify-center items-center w-full backdrop-blur-sm overflow-y-auto overflow-x-hidden max-h-[80vh]">
            <div className="relative p-4 w-[60%]">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
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
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" action="#">
                            <div className="grid grid-cols-3 gap-5">
                                <div className="mb-3">
                                    <label htmlFor="productId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Id<span className="text-red-500">*</span></label>
                                    <input type="text" name="productId" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Id" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name<span className="text-red-500">*</span></label>
                                    <input type="text" name="name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Name" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price<span className="text-red-500">*</span></label>
                                    <input type="number" name="price" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Price" required/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                    <div className="mb-3">
                                        <label htmlFor="dimension" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Dimension<span className="text-red-500">*</span></label>
                                        <input type="text" name="dimension" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Dimension" required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Category<span className="text-red-500">*</span></label>
                                        <select name="category" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                            <option value="">Select Category</option>
                                            <option value="Speakers">Speaker</option>
                                            <option value="Blubs">Blubs</option>
                                            <option value="Mic">Mic</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="availability" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Availability<span className="text-red-500">*</span></label>
                                        <select name="availability" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                            <option value="">Select Availability</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Quantity<span className="text-red-500">*</span></label>
                                        <input type="number" name="quantity" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Quantity" required/>
                                    </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="discription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Discription<span className="text-red-500">*</span></label>
                                <textarea name="discription" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Product Discription"/>
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