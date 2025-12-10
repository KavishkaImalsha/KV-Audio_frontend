import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import GridLoader from "react-spinners/GridLoader"
import { Plus, Search, Edit, Trash2, Package, Layers, Box } from "lucide-react"
import BackendApi from "../../../api/BackendApi"
import UploadMediaFiles from "../../../actions/UplodMediaFiles"
import AddItemModel from "../../../components/admin/AddItemModel"

const Items = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [itemDetails, setItemDetails] = useState({
        productId: "", name: "", price: 0, category: "", dimension: "", discription: "", availability: "", quantity: "", image: []
    })
    const [productImages, setProductImages] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllProducts()
    }, [])

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredProducts(products)
        } else {
            const lowerTerm = searchTerm.toLowerCase()
            const filtered = products.filter(product => 
                product.name.toLowerCase().includes(lowerTerm) ||
                product.productId.toLowerCase().includes(lowerTerm) ||
                product.category.toLowerCase().includes(lowerTerm)
            )
            setFilteredProducts(filtered)
        }
    }, [searchTerm, products])

    const fetchAllProducts = async () => {
        setIsLoading(true)
        try {
            const response = await BackendApi.get(`/products`)
            setProducts(response.data)
            setFilteredProducts(response.data)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error Occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const deleteItem = (itemId) => {
        Swal.fire({
            title: "Delete Product?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444", 
            cancelButtonColor: "#6B7280", 
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await BackendApi.delete(`/products/${itemId}`)
                    toast.success(response.data.message)
                    setProducts(prev => prev.filter(p => p._id !== itemId))
                } catch (error) {
                    toast.error(error?.response?.data?.message || "Error Occurred")
                }
            }
        })
    }

    const updateItem = (product) => {
        navigate('/admin/edit-item', { state: product })
    }

    const addImages = async () => {
        const flatFiles = Array.from(productImages).flatMap(item => 
            item instanceof FileList ? Array.from(item) : item
        ).filter(item => item instanceof File || item instanceof Blob);

        if (flatFiles.length === 0) return [];
        
        if (flatFiles.length > 5) {
            toast.error("Maximum 5 images only");
            return [];
        }

        const promises = [];

        flatFiles.forEach((file) => {
            const promise = UploadMediaFiles(file);
            promises.push(promise);
        });

        try {
            const result = await Promise.all(promises);
            return result;
        } catch (error) {
            console.log(error);
            
            console.error("Batch Upload Error:", error);
            toast.error("One or more images failed to upload");
            return [];
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (productImages.length !== 0) {
                if (productImages.length > 5) {
                    toast.error("Maximum 5 images only")
                    return
                }
                const uploadImageURLs = await addImages()
                itemDetails.image = uploadImageURLs
                setProductImages([])
            }

            const response = await BackendApi.post(`/products`, itemDetails)
            toast.success(response.data.message)
            setIsModalVisible(false)
            fetchAllProducts()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error Occurred")
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6 font-quicksand">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your products, stock, and pricing.</p>
                </div>
                
                <button 
                    onClick={() => setIsModalVisible(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                    <Plus size={20}/> Add New Product
                </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={20} className="text-gray-400"/>
                    </div>
                    <input 
                        type="text"
                        placeholder="Search by product name, ID, or category..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <GridLoader color="#2563eb" />
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                                    <th className="px-6 py-4 font-semibold">Product Info</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold">Price</th>
                                    <th className="px-6 py-4 font-semibold">Stock</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                            
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                                                        {product.image && product.image.length > 0 ? (
                                                            <img src={product.image[0]} alt={product.name} className="w-full h-full object-cover"/>
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                <Package size={20}/>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-800 text-sm">{product.name}</h3>
                                                        <span className="text-xs text-gray-500">ID: {product.productId}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                                    <Layers size={16} className="text-blue-500"/>
                                                    {product.category}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-800 flex items-center gap-1">
                                                    <span className="text-gray-400 text-xs font-bold uppercase">Rs.</span>
                                                    {product.price.toFixed(2)}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Box size={16} className="text-gray-400"/>
                                                    {product.quantity} units
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1 ${
                                                    product.availability 
                                                    ? "bg-green-100 text-green-700" 
                                                    : "bg-red-100 text-red-700"
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        product.availability ? "bg-green-500" : "bg-red-500"
                                                    }`}></span>
                                                    {product.availability ? "Active" : "Unavailable"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => updateItem(product)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={18}/>
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteItem(product._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18}/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            No products found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
                        <span>Showing {filteredProducts.length} items</span>
                    </div>
                </div>
            )}

            {isModalVisible && (
                <AddItemModel 
                    showModel={setIsModalVisible} 
                    setItem={setItemDetails} 
                    submitForm={handleSubmit} 
                    setProductImages={setProductImages}
                    productImages={productImages}
                />
            )}
        </div>
    )
}

export default Items