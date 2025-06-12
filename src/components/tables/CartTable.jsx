import { useEffect, useState } from "react"

const CartTable = ({products, cartItems, setCartItems, setSubTotal}) => {
    useEffect(() => {
        if(!products && !cartItems){
            return
        }
        let subTotal = 0
        cartItems.products.map((item) => {
            const product = products.find((product) => (product._id === item.productId))
            const totalPrice = product.price * item.quantity
            subTotal += totalPrice
        })
        
        const subTotalWithDays = subTotal * cartItems.days
        setSubTotal(subTotalWithDays)
    }, [products, cartItems])
    
    const changeQuantity = (product, action) => {
        const updateCart = {...cartItems}

        updateCart.products = updateCart.products.map((item) => {
            if(item.productId == product._id){
                let newQuantity = item.quantity

                if(action == 'increase'){
                    newQuantity += 1
                    if(newQuantity > product.quantity){
                        newQuantity = product.quantity
                    }
                }else if(action == 'decrease'){
                    newQuantity -= 1
                    if(newQuantity <= 0){
                        newQuantity = 1
                    }
                }
                return {...item, quantity: newQuantity}
            }

            return item
        })

        setCartItems(updateCart)
        localStorage.setItem('cart', JSON.stringify(updateCart))
    }
    
    return(
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th></th>
                            <th scope="col" className="px-6 py-3">
                                Price / (per day)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td scope="row" className="px-6 py-4">
                                   <div className="flex gap-5">
                                        <div className="w-24 h-24">
                                            <img src={product.image[0]} className="bg-cover bg-no-repeat bg-center"/>
                                        </div>
                                        <div>
                                            <h1>{product.name}</h1>
                                            <ul className="my-2">
                                                <li>Category: <span className="text-black font-semibold">{product.category}</span></li>
                                                <li>Dimension: <span className="text-black font-semibold">{product.dimension}</span></li>
                                            </ul>
                                        </div>
                                   </div>
                                </td>
                                <td>
                                    <p className="text-black font-semibold">In Stock({product.quantity} Pcs)</p>
                                </td>
                                <td className="px-6 py-4 text-black">
                                    Rs: {product.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-xl hover:cursor-pointer" onClick={() => {changeQuantity(product,"decrease")}}>-</button>
                                    <span className="text-black mx-2">{cartItems.products.map((item) => {if(item.productId == product._id){return item.quantity}})}</span>
                                    <button className="text-xl hover:cursor-pointer" onClick={() => {changeQuantity(product,"increase")}}>+</button>
                                </td>
                                <td className="px-6 py-4 text-black">
                                    Rs: {cartItems.products.map((item) => {if(item.productId == product._id){
                                        const totalPrice = product.price * item.quantity
                                        return totalPrice.toFixed(2)
                                    }})}
                                </td>  
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default CartTable