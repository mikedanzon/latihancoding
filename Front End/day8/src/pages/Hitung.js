import React from 'react';
import { connect } from 'react-redux';
import { HitungAction } from '../redux/actions';

const Hitung=(props)=>{
    const hitungHandler=(e)=>{
        var kalimat = e.target.value
        var kalimat2 = kalimat.split(' ').filter((val)=>val!=='')
        props.HitungAction(kalimat2.length)
    }

    return (
        <div className="px-5 pt-5">
            <h1>Hitung Kata</h1>
            <textarea onChange={hitungHandler} className="form-control" cols="30" rows="10"></textarea>
        </div>
    )
}

export default connect (null,{HitungAction})(Hitung);