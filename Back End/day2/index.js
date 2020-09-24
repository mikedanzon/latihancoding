// try {
//     console.log("test")
// } catch (error) {
//     console.log(error)
// }

const {
    tambah,
    kurang,
    bagi,
    kali,
    tambahsemuaangka
} = require("./operasihitung")

console.log(tambah(2,3))//5
console.log(kurang(3,2))//1
console.log(bagi(6,2))//3
console.log(kali(2,3))//6
console.log(tambahsemuaangka(1,2,3,4,5))//15