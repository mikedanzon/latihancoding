require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const { ProductRoutes, KaryawanRoutes } = require('./Routes')
//app.use(express.json()) // ganti pake bodyParser
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static('public'))
app.use('/products',ProductRoutes)
app.use('/karyawans',KaryawanRoutes)

app.get('/',(req,res)=>{
    res.status(200).send(`
    <center>
    <h1>Welcome to testing backend with Max</h1>
    </center>
    <p>What do you need ?</p>
    • <a href="/karyawans">Check Karyawan</a><br>
    ( Check each karyawan you must put /id number for the user )
    `)
})

app.listen(5000,()=>{
    console.log('API Active Port 5000')
})