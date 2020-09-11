export const bebasTambah=(angka)=>{
    return {
      type:'TAMBAH',
      payload:angka
    }
}

export const bebasKurang=()=>{
    return {
        type:'KURANG'
    }
}