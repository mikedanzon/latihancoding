const url = 'http://localhost:4000/products'

function Fetchdata(url1) {
    var promise = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText)
                resolve(response)
            } else {
                reject(Error('ERORR BERO'))
            }
        }
        xhr.open('GET', url1)
        xhr.send()
    })
    return promise
}

async function Tampilan() {
    try {
        const res = await Fetchdata(url)
        var render = res.map((val) => {
            return (
                `<li>${val.tripname}</li>`
            )
        })
        document.getElementById('list').innerHTML = render.join('')
    } catch (error) {
        alert(error)
    }
    // Fetchdata(url)
    // .then((res)=>{
    //     var render= res.map((val)=>{
    //         return (
    //             `<li>${val.tripname}</li>`
    //         )
    //     })
    //     document.getElementById('list').innerHTML=render.join('')
    // }).catch((err)=>{
    //     alert(err)
    // })
}

Tampilan()