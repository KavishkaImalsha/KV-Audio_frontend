import toast from "react-hot-toast"

export const loadCart = () => {
    const cart = localStorage.getItem('cart')

    if(!cart){
        const cartItem = {
            products: [],
            days: null,
            startingDate: null,
            endingDate: null
        }
        localStorage.setItem('cart', JSON.stringify(cartItem))
        return cartItem
    }
    return JSON.parse(cart)
}

export const addToCart = (productId, quantity, navigate) => {
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
    }else{
        toast.error("Please login first to add items to cart")
        navigate('/login');
    }
}