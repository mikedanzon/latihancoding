const http = require('http')

var server = http.createServer((req,res)=>{
    res.writeHead(200, {
        'Content-type': 'text/html'
    })
    res.end('<h1>halo semuanya</h1>')
})

server.listen(5000)
console.log("Server active port 5000")