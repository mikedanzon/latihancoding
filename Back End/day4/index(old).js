// cara lama express.json buat body parser
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())

// res status 400 = not found , 200 = success , 300 = salah dari user , 500 = server error

// app.get('/',(req,res)=>{
//     // var dataku = {
//     //     name: 'max'
//     // }
//     // res.send(dataku)
//     // return res.status(200).send(dataku)
//     // bisa pake res.status (cek docs)
//     res.send('<h1>Welcome to Max API</h1>')
// })

// app.get('/max',(req,res)=>{
//     res.send('<h1>max</h1>')
// })

// app.get('/getdata',(req,res)=>{
//     res.send({testing:'test'})
// })

// contoh query http://localhost:5000/testingquery?nama=siapaaja
// app.get('/testingquery',(req,res)=>{
//     const {nama,usia} = req.query
//     if (nama) {
//         res.send("ada nama")
//     } else {
//         res.send("perlu pake query")
//     }
// })

// app.get('/testing/:id',(req,res)=>{
//     var a = req.params.id
//     if (a==1){
//         return res.send('satu')
//     } else {
//         return res.send('yang lain')
//     }
// })

// contoh query http://localhost:5000/4 , 4 adalah paramsnya
// app.get('/users/:id',(req,res)=>{
//     const id = req.params.id // misal :idusers maka params = req.params.idusers
//     res.status(200).send({
//         id:id
//     })
// })

// app.post('/users',(req,res)=>{
//     console.log(req.body)
//     res.status(200).send(req.body)
// })

// app.get('/users',(req,res)=>{
//     res.status(200).send('hehehe test')
// })