// function test(address, n) {
//     var output = 0;
//     if (address>0) {
//         if (address==1) {
//             output = (address - 1) + (n * 2)
//         } else {
//             output = (address - (address + (address - 1))) + (n * 2)
//         }
//     } else {
//         output = 0;
//     }
//     return output
// }

// console.log(test(3, 4))

// function ganjilgenap(num) {
//     var output = num.replace(/\D/g,'');
//     if (output % 2 == 0) {
//         output = "genap";
//     } else {
//         output = "ganjil";
//     }
//     return output
// }

// console.log(ganjilgenap('B 125 RDK'))

// tugas , buat : password harus ada huruf besar,kecil,angka (tanpa regex)

function anggi(boll) {
    return boll?'rafi':'hana';
}

function robin(cb,boold) {
    if(cb(boold) == 'rafi') {
        return ()=>{
            return{
                hasian:['marcelino']
            }
        }
    } else if (cb(boold) == 'hana') {
        return ()=>{
            return{
                hasian:['mag']
            }
        }
    }
}

console.log(robin(anggi,true)().hasian[0])//marcelino , kalo false // mag

