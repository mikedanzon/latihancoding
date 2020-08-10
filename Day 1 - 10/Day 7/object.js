// let biodata = {
//     nama: "Max",
//     umur: 25,
    // namaumur: function() { this.nama + this.umur } // function
    // namaumur2() { this.nama + this.umur } // langsung jadi function
// }

// biodata nama bisa jadiin array trus bisa di push , biodata.nama.push("<isi>")
// biodata.<variable> = "<isi nya bisa string / number>"
// Contoh:
// biodata.hoby = "berenang";
// console.log(biodata)
// 3 cara manggil object :
// console.log(biodata.nama)
// console.log(biodata["nama"])
// let test = "nama";
// console.log(biodata[test])

// class Human {
//     constructor(a,b,c) {
//         this.nama = a;
//         this.umur = b;
//         this.job = c;
//     }

//     buatkalimat=()=>{ // function
//         return "Nama saya " + this.nama + ", umur saya " + this.umur;
//     }
// }

// let manusia = [];
// manusia.push(new Human ("max",25,"pelajar"))
// console.log(manusia[0].buatkalimat())
// max.nama = "michael"; // mengganti isi variable nama di max

// Tambahin class guru dan isi variable a b c nya di ambil(extends) dari human
// class Guru extends Human {
//     constructor(a,b,c,d) {
//         super(a,b,c)
//         this.kerja = d;
//     }
// }
        
// let dino = new Guru("dino",25,"guru","mengajar");
// console.log(dino)