// Kirim link reposity ke dinotestes12@gmail.com

// Solve it #1
/*
let x = 4;
let y = 3;
let z = 2;

let w = ( (x + y * z) / (x * y) ) ** 2;

console.log(w)
*/

// Solve it #2 di solve2.html

// Solve it #3
/*
let num = Math.pow(8, 1/3);

console.log(num);
*/

// Solve it #4
/*
let hari = 485;
let tahun = Math.trunc(hari / 360);
let bulan = Math.trunc((hari - tahun * 360) / 30);
let minggu = Math.trunc((hari - tahun * 360 - bulan * 30) / 7);
let day = Math.trunc(hari - tahun * 360 - bulan * 30 - minggu * 7);

console.log(hari + " hari itu: " + tahun + " Tahun, " + bulan + " Bulan, " + minggu + " Minggu, " + day + " Hari")
// ============ cara lain ===========
let hari = 495;
let tahun = Math.trunc(hari/360);
let left = 485 % 360;
let bulan = Math.trunc(left/30);
left %= 30;
let minggu = Math.trunc(left/7);
left %= 7;

console.log(hari + " hari itu: " + tahun + " Tahun, " + bulan + " Bulan, " + minggu + " Minggu, " + left + " Hari")
*/

// Solve it #5
/*
let andi = 49 / (0.4 + 1);
let budi = 49 - andi;

console.log("Umur Andi = " + andi + "\nUmur Budi = " + budi)
*/

// Solve it #6
/*
var date = new Date();
var month = date.getMonth() + 1;
var day = date.getDay();
var year = date.getFullYear();

console.log("Hari ini tanggal " + day + "-" + month + "-" + year)
console.log("Besok ini tanggal " + (day + 1) + "-" + month + "-" + year)
console.log("Kemarin ini tanggal " + (day - 1) + "-" + month + "-" + year)
*/

// Solve it #7
/*
console.log("Tidak bisa dikerjain belum dikasih pelajarannya")
*/

// Solve it #8
/*
let mobilA = 60;
let mobilB = 40;
let jarak = 120;
let start = 9 * 60;
let bertabrakan = jarak / ( mobilA + mobilB );
let menit = bertabrakan * 60;

console.log("Mobil A & B bertabrakan pada pukul " + ((start + menit) / 60) + "0 WIB") 
*/

// Solve it #9 di solve9.html