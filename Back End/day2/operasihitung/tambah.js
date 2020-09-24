const tambah = (a, b) => {
    return a + b
}

const tambahsemuaangka=(...params)=>{
    var total=0
    params.forEach((val)=>{
        total+=val
    })
    return total
}

module.exports = {
    tambah:tambah,
    tambahsemuaangka
}