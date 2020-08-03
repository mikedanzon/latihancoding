// Solve it
// let alas = ""; // Value : sandal / sepatu
// let warna = ""; // Value : merah / biru
// let harga = ""; // Value : murah / mahal

// switch(true) {
//     case (alas == "sandal" && warna == "merah" && harga == "murah"):
//         console.log(alas+" warna "+warna+" dengan harga "+murah)
//         break;
//     case (alas == "sandal" && warna == "biru" && harga == "mahal"):
//         console.log(alas+" warna "+warna+" dengan harga "+murah)
//         break;
//     case (alas == "sandal" && warna == "merah" && harga == "murah"):
//         console.log(alas+" warna "+warna+" dengan harga "+murah)
//         break;
//     case (alas == "sandal" && warna == "merah" && harga == "mahal"):
//         console.log(alas+" warna "+warna+" dengan harga "+murah)
//         break;
//     case (alas == "sepatu" && warna == "merah" && harga == "murah"):
//         console.log(alas+" warna "+warna+" dengan harga "+murah)
//         break;
//     case (alas == "sepatu" && warna == "biru" && harga == "murah"):
//         console.log(alas+" warna "+warna+" dengan harga "+murah)
//         break;
//     case (alas == "sepatu" && warna == "merah" && harga == "mahal"):
//         console.log(alas+" warna "+warna+" dengan harga "+murah)
//         break;
//     case (alas == "sepatu" && warna == "biru" && harga == "mahal"):
//         console.log(alas+" warna "+warna+" dengan harga "+murah)
//         break;
//     default:
//         console.log("Pilihan anda tidak masuk di database")
//         break;
// }

// ====================================================

// Solve it 11
// let date = new Date();
// let month = date.getMonth() + 1;
// let monthName = ["", "Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
// console.log("Saat ini bulan "+month+" : "+monthName[month])

// ====================================================

// Solve it 12
// let date = new Date();
// let year = date.getFullYear();
// let month = date.getMonth() + 1;
// let tanggal = date.getDate();
// var weekday = new Array(7);
// weekday[0] = "Minggu";
// weekday[1] = "Senin";
// weekday[2] = "Selasa";
// weekday[3] = "Rabu";
// weekday[4] = "Kamis";
// weekday[5] = "Jumat";
// weekday[6] = "Sabtu";
// let day = weekday[date.getDay()];
// let hour = date.getHours();
// let minute = date.getMinutes();
// let second = date.getSeconds();
// let monthName = ["", "Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

// console.log("Hari ini "+day+", "+tanggal+" "+monthName[month]+" "+year+"\nPukul "+hour+":"+minute+":"+second)

// ====================================================

// Solve it 13
// let massa = 67;
// let tinggi = 1.78; 
// let imt = massa / (tinggi ** 2);

// if (imt <= 18.5 ) {
//     console.log("Berat badan kurang")
// } else if (imt > 18.5 && imt <= 24.9) {
//     console.log("Berat badan ideal")
// } else if (imt >= 25 && imt <=29.9) {
//     console.log("Berat badan berlebih")
// } else if (imt >= 30 && imt <= 39.9) {
//     console.log("Berat badan sangat berlebih")
// } else {
//     console.log("Obesitas lu cok")
// }