import React, { useState } from 'react';

const Parkir=()=>{
    const [mobilmotor,setMobilMotor] = useState('Mobil')
    const [jamparkir,setJamParkir] = useState(0)
    const [hargaparkir,setHargaPark] = useState(2000)
    const [biayaparkir,setBiayaParkir] = useState(0)

    const changeMobil=()=>{
        setMobilMotor('Mobil')
        setHargaPark(2000)
    }

    const changeMotor=()=>{
        setMobilMotor('Motor')
        setHargaPark(1000)
    }

    const onJamParkir=(e)=>{
        setJamParkir(e)
    }

    const bayarParkir=()=>{
        if (mobilmotor == 'Mobil' && jamparkir) {
            var hargaTotal = jamparkir * hargaparkir;
            setBiayaParkir(hargaTotal)
        } else if (mobilmotor == 'Motor' && jamparkir) {
            var hargaTotalMotor = jamparkir * hargaparkir;
            setBiayaParkir(hargaTotalMotor)
        } else {
            return console.log("belom ada jam parkir")
        }
    }

    return (
        <div className="text-center mt-3">
            <div className="mb-3">
                <h1>Ini Parkir {mobilmotor}</h1> {/*pas klik motor ganti motor*/}
            </div>
            <div className="mb-3">
                <button className="mr-4 btn btn-primary" onClick={changeMobil}>Mobil</button>
                <button className="btn btn-primary" onClick={changeMotor}>Motor</button>
            </div>
            <div className="mb-3">
                <input type="number" placeholder="berapa jam" onChange={(e)=>onJamParkir(parseInt(e.target.value))}/>
            </div>
            <div className="mb-3">
                <h3>{hargaparkir} / jam</h3> {/*pas klik motor ganti 1000 / jam*/}
            </div>
            <button className="btn btn-success" onClick={bayarParkir}>Bayar</button>
            <br/>total Rp {biayaparkir}
        </div>
    )
}

export default Parkir;