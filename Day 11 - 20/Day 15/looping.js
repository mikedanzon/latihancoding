// output
// *
// 12
// ***
// 3456
// *****

// liat video
// copy looping day 4 & 5 dari dino punya trus belajar lagi

// 1
// *3*
// *5*7*

function tengah(num) {
    var str = num.length
    if (str%2 == 0) {
        return num[str/2-1]+num[str/2]
    } else {
        return num[(str+1)/2-1]
    }
}

console.log(tengah('abcefghijkl'))