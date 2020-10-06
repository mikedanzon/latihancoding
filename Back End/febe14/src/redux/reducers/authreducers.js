const INITIAL_STATE = {
    id: 0,
    username: '',
    isLogin: false,
    isLoading: false,
    errormsg: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, ...action.payload, isLogin: true, isLoading: false }
        case 'LOADING':
            return { ...state, isLoading: true }
        case 'ERROR':
            return { ...state, errormsg: action.payload }
        default:
            return state
    }
}