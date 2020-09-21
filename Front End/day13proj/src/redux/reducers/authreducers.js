const INITIAL_STATE = {
    username:'',
    password:'',
    id:0,
    role:'',
    isLogin:false,
    cart:[]
}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'LOGIN':
            return {...state,...action.payload,isLogin:true,cart:action.cart}
        case 'CART':
            return {...state,cart:action.cart}
        default:
            return state
    }
}