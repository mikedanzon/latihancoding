// obj = {
//     head: 5,
//     eyes: 2
// }
// function newFunc({head,eyes}) {
//     return "manusia punya "+head+" kepala dan "+eyes+" mata";
// }
// console.log(newFunc(obj))
// console.log(newFunc({head: 10,eyes:20}))

// const {head,eyes} = obj
// console.log(head)
// console.log(eyes)

// obj2 = {
//     hand: 2,
//     leg: 5
// }
// let gabung = {...obj,...obj2}
// let gabung2 = {...obj,perut: 5}
// console.log(gabung)
// console.log(gabung2)

// contoh function callback
// var angka=(a)=>a*2; // function

// var keliling=(cb,p,l)=>{
//     return cb(p)+cb(l);
// }

// console.log(keliling(angka,2,4))

// contoh map

// var newarr = [1,2,3,4,5]

// var arrbaru = newarr.map((terserah)=>terserah*2)
// console.log(newarr)
// console.log(arrbaru)

// var newarr2 = [1,2,3,4,5]

// var arrbaru = newarr2.map((val,index)=>{
//     if (index%2) {
//         return val*2
//     } else {
//         return val*3
//     }
// })

// console.log(arrbaru)

// looping for each == sama aja kek looping for 
// var newarr = [1,2,3,4,5]

// for (i=0;i<newarr.length;i++) {
//     console.log(i+" "+newarr[i])
// }

// console.log("==== pembatas ====")

// newarr.forEach((val,index) => {
//     console.log(index+" "+val)
// });

// let newarr = [1,2,3,4,5,6]
// let filteraa = newarr.filter((val,index)=> val%2 === 0)
// console.log(filteraa)

// const filteralala = (newarr) => {
//     var output = [];
//     for (i=0;i < newarr.length;i++) {
//         if ( newarr[i] % 2 == 0 ) {
//             output += newarr[i];
//         }
//     }
//     return output
// }
// console.log(filteralala(newarr))