const express = require('express')
const app = express()

// res status 400 = not found , 200 = success , 300 = salah dari user , 500 = server error

app.get('/',(req,res)=>{
    var dataku = {
        name: 'max'
    }
    res.send(dataku)
    // return res.status(200).send(dataku)
    // bisa pake res.status (cek docs)
})

app.get('/max',(req,res)=>{
    res.send('<h1>max</h1>')
})

app.get('/getdata',(req,res)=>{
    res.send({testing:'test'})
})

app.get('/testingquery',(req,res)=>{
    const {nama,usia} = req.query
    if (nama) {
        res.send("ada nama")
        // link access http://localhost:5000/testingquery?nama=siapaaja
    } else {
        res.send("perlu pake query")
    }
})

app.get('/testing/:id',(req,res)=>{
    var a = req.params.id
    if (a==1){
        return res.send('satu')
    } else {
        return res.send('yang lain')
    }
})

app.listen(5000,()=>{
    console.log('API Active Port 5000')
})