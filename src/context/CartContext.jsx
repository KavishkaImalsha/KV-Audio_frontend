import { createContext, useEffect, useState } from "react";
import { loadCart } from "../actions/CartActions";
import toast from "react-hot-toast"

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cart"))

        if(cartItems && cartItems.products){
            setCartCount(cartItems.products.length)
        }
    }, [])

    const addToCart = (productId, quantity, navigate) => {
        const token = localStorage.getItem('token')

        if(token){
            const cart = loadCart()
            let isFound = false

            if(cart){
                cart.products.map((product) => {
                    if(product.productId == productId){
                        product.quantity += quantity
                        localStorage.setItem("cart", JSON.stringify(cart))
                        toast.success("Item added to cart")
                        isFound = true
                        return
                    }
                })
            }

            if(!isFound){
                cart.products.push({productId: productId, quantity: quantity})
                localStorage.setItem('cart', JSON.stringify(cart))
                toast.success("Item added to cart")
            }

            setCartCount(cart.products.length)
        }else{
            toast.error("Please login first to add items to cart")
            navigate('/login');
        }
    }

    return(<CartContext.Provider value={{cartCount, addToCart}}>
        {children}
    </CartContext.Provider>)
}

export default CartContext