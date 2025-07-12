import { useNavigate } from "react-router-dom"
import { addToCart } from "../../actions/CartActions"

const NewArrivalsCard = ({product, index}) => {
    const navigate = useNavigate()
    
    return(<>
        <div key={index} className="mb-2 m-auto w-[250px] h-[300px] rounded-lg border border-gray-300 relative">
            <img className="w-full h-[70%] object-contain" src={product.image[0]}/>
            <span className="absolute top-3 left-3 bg-gray-300 p-1 rounded-lg">New</span>
            <h1 className="pt-2 px-2 font-quicksand font-semibold text-gray-400">{product.name}</h1>
            <div className="flex justify-between px-2">
                <p className="font-semibold">Rs: {product.price.toFixed(2)} /per day</p>
                <button className="hover:cursor-pointer"
                    onClick={() => {addToCart(product._id, 1, navigate)}}
                ><img className="w-7 h-7 mr-2" src="https://img.icons8.com/?size=100&id=59997&format=png&color=000000"/></button>
            </div>
        </div>
    </>)
}

export default NewArrivalsCard