const initialState = { 
    jumlahkata:0
}

export default (state=initialState,action)=>{
    switch (action.type) {
        case 'HITUNGKATA':
            return {...state,jumlahkata:action.payload}
        default:
            return state
    }
}