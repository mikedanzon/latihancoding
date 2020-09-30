const Router = require('express').Router()

const database = [
    {
        id: 1,
        namaProd: 'Sepatu Sakti',
        deskripsi: 'Ya gitu lah',
        harga: 100000
    },
    {
        id: 2,
        namaProd: 'Sepatu Mahal',
        deskripsi: 'Ya gitu lah mahal pokoknya',
        harga: 500000
    },
    {
        id: 3,
        namaProd: 'Sepatu Netflix',
        deskripsi: 'Ya gitu lah buat nonton',
        harga: 30000
    }
]

Router.post('/',(req,res)=>{
    var {namaProd,deskripsi,harga} = req.body
    if (namaProd || deskripsi || harga) {
        database.push({
            id: database.length + 1,
            namaProd,
            deskripsi,
            harga
        })
        res.status(200).send(database)
    } else {
        res.status(300).send('semua musti di isi')
    }
})

Router.put('/:id',(req,res)=>{
    var {id} = req.params
    var index = database.findIndex((val)=>val.id==id)
    database[index] = {...database[index],...req.body}
    res.status(200).send(database)
})

Router.delete('/id',(req,res)=>{
    var {id} = req.params
    var index = database.findIndex((val)=>val.id==id)
    database.splice(index,1)
    res.status(200).send(database)
})

Router.get('/',(req,res)=>{
    // var namaProd = req.query.namaProd
    // var hargamin = req.query.hargamin
    // var hargamax = req.query.hargamax
    var {namaProd,hargamin,hargamax} = req.query
    if (namaProd || hargamin || hargamax) {
        var filterdata = database.filter((val,index)=>{
            var hargamin1 = true;
            var hargamax1 = true;
            var namaProd1 = true;
            if (hargamin) {
                hargamin1 = hargamin <= val.harga
            }
            if (hargamax) {
                hargamax1 = hargamax >= val.harga
            }
            if (namaProd) {
                namaProd1 = val.namaProd.toLowerCase().includes(namaProd.toLowerCase())
            }
            return hargamax1&&hargamin1&namaProd1
        })
        res.send(filterdata)
    } else {
        res.status(200).send(database)
    }
})

module.exports = Router