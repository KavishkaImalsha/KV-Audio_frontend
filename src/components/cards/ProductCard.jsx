const ProductCard = ({products, setIsVisible, setSelectedItemId}) => {
    return(
        products.map((product, index) => {
            return(
            <div key={index} className="w-full h-[420px] max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
            <img
                className="rounded-t-lg h-[250px] m-auto"
                src={product.image[0]}
                alt="product image"
            />
            </a>
            <div className="px-2 pb-2 my-2">
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.name}
                </h5>
            </a>
            <div className="text-sm text-gray-400 my-2">
                <p>Category {`> ${product.category}`} </p>
            </div>
            <div className="flex items-center justify-between">
                <span className={`text-3xl font-bold ${product.availability ? 'text-green-500' : 'text-red-500'}`}>
                    Rs: {parseFloat(product.price).toFixed(2)}
                </span>
                <div className={`${product.availability ? 'bg-green-300 text-green-500' : 'bg-red-300 text-red-500'} p-2 rounded-full text-sm`}>
                    {product.availability ? 'Available' : 'Out Of Stock'}
                </div>
            </div>
            <div className="flex justify-center items-center my-3">
            <button
                onClick={() => {
                    setSelectedItemId(product._id)
                    setIsVisible(true)}}
             type="button" class="cursor-pointer text-white bg-blue-700 w-[200px] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">View Item</button>
            </div>
        </div>
      </div>)
        })
    )
}

export default ProductCard