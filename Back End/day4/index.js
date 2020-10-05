const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const crypto = require('crypto')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static('public'))
const { ProductRoutes, KaryawanRoutes } = require('./Routes')
app.use('/products',ProductRoutes)
app.use('/karyawans',KaryawanRoutes)
//app.use(express.json()) // ganti pake bodyParser

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

app.get('/encrypt',(req,res)=>{
    var password = req.query.password
    var katakunci = process.env.ENCRYPT_KEY
    var hashpassword = crypto.createHmac('sha256',katakunci).update(password).digest('hex')
    res.send({
        passwordsebelum: password,
        passwordencrypt: hashpassword,
        panjangpass: hashpassword.length
    })
})

app.listen(5000,()=>{
    console.log('API Active Port 5000')
})