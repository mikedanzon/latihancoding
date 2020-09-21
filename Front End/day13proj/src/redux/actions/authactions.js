export const LoginFunc=(user,cart)=>{
    return {
        type:'LOGIN',
        payload:user,
        cart:cart
    }
}

export const Addtocart=(cart)=>{
    return {
        type:'CART',
        cart:cart
    }
}