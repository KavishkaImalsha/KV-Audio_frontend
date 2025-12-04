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
