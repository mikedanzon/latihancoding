// Tugas huruf + 1 alphabet
let kata = "michael";
let hasil = "";
for (i = 0; i < kata.length; i++) {
    hasil += String.fromCharCode(kata.charCodeAt(i) + 1);
}
console.log(hasil)