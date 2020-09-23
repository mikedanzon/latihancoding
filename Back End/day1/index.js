// var bebas = require("./satu") // import bebas from satu
// var {nama,namalengkap} = require("./satu") // import {} from satu
// var namalengkap = require("./satu")
// console.log(bebas.nama)
// console.log(bebas.namalengkap("hahaha"))
// console.log(nama)
// console.log(namalengkap("asasd"))

// var a = 123 // kalau hasil = false , bakal masuk salah ketika kita console.log b
// var b = a || 'salah'
// console.log(b)

var obj = {
    a: 2,
    b: 5,
    c: 3
}
var ambil = obj.c
var { a, b } = obj
function test(obj) { // bisa pake test({a,b}) jadi ga perlu pake obj lagi, objnya pass di call function aja test(obj)
    return obj.a + obj.b
}
console.log(ambil)
console.log(a, b)
console.log(test(obj))