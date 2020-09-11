const InitialState = 1;

const AngkaReducer=(state=InitialState,action)=>{
  switch (action.type) {
    case 'TAMBAH':
      return state + action.payload;
    case 'KURANG':
      return state - 1;
    default:
      return state;
  }
}

export default AngkaReducer;