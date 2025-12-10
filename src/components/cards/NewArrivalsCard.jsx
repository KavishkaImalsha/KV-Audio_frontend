import { ShoppingBag, Star } from "lucide-react"
import { useContext } from "react"
import CartContext from "../../context/CartContext"
import { useNavigate } from "react-router-dom"

const NewArrivalsCard = ({ product, setIsModelShow, setClickedProduct }) => {
    const { addToCart } = useContext(CartContext)
    const navigate = useNavigate()
    const handleModelShow = () => {
        setIsModelShow(true)
        setClickedProduct(product)
    }

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product._id, 1, navigate)
    }


    return (
        <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
            <div className="relative h-48 sm:h-56 bg-gray-50 p-4 flex items-center justify-center overflow-hidden">
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm">
                    New Arrival
                </span>

                <img 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out" 
                    src={product.image[0]} 
                    alt={product.name} 
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                    <h1 className="font-quicksand font-bold text-gray-800 text-lg leading-tight line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors hover:cursor-pointer"
                        onClick={handleModelShow}
                    >
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-1 mb-3">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-400 font-medium">4.8 (New)</span>
                    </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Rent per day</span>
                        <span className="font-bold text-blue-600 text-xl">Rs: {product.price.toFixed(2)}</span>
                    </div>

                    <button 
                        className="bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 p-3 rounded-full transition-all duration-300 shadow-sm active:scale-95"
                        onClick={handleAddToCart}
                        title="Add to Cart"
                    >
                        <ShoppingBag size={20} />
                    </button>
                </div>
            </div>
             
        </div>
    )
}

export default NewArrivalsCard