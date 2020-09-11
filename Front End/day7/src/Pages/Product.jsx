import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bebasTambah, bebasKurang } from '../redux/actions'

const Product=(props)=>{
  const [provinsi,setProvinsi] = useState([])
  const [kabupaten,setKabupaten] = useState([])
  const [kecamatan,setKecamatan] = useState([])
  const [kelurahan,setKelurahan] = useState([])
  const [angka,setAngka] = useState(1)
  // const [dataawal,setDataAwal] = useState({prov:'0',kab:'0',kec:'0',kel:'0'})
  
  useEffect(()=>{
    axios.get(`https://x.rajaapi.com/MeP7c5ne${props.datatoken}/m/wilayah/provinsi`)
    .then((res)=>{
      setProvinsi(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  const renderProvinsi=()=>{
    return provinsi.map((val,index)=>{
      return (
        <option key={index} value={val.id}>{val.name}</option>
      )
    })
  }

  const onChangeProv=(e)=>{
    axios.get(`https://x.rajaapi.com/MeP7c5ne${props.datatoken}/m/wilayah/kabupaten?idpropinsi=${e.target.value}`)
    .then((res)=>{
      setKabupaten(res.data.data)
      // setDataAwal({...dataawal,prov:e.target.value})
    }).catch((err)=>{
      console.log(err)
    })
  }

  const renderKabupaten=()=>{
    return kabupaten.map((val,index)=>{
      return (
        <option key={index} value={val.id}>{val.name}</option>
      )
    })
  }

  const onChangeKab=(e)=>{
    axios.get(`https://x.rajaapi.com/MeP7c5ne${props.datatoken}/m/wilayah/kecamatan?idkabupaten=${e.target.value}`)
    .then((res)=>{
      setKecamatan(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const renderKecamatan=()=>{
    return kecamatan.map((val,index)=>{
      return (
        <option key={index} value={val.id}>{val.name}</option>
      )
    })
  }

  const onChangeKec=(e)=>{
    axios.get(`https://x.rajaapi.com/MeP7c5ne${props.datatoken}/m/wilayah/kelurahan?idkecamatan=${e.target.value}`)
    .then((res)=>{
      setKelurahan(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const renderKelurahan=()=>{
    return kelurahan.map((val,index)=>{
      return (
        <option key={index} value={val.id}>{val.name}</option>
      )
    })
  }

  const tambahBebas=()=>{
    props.bebasTambah(angka)
  }

  const kurangBebas=()=>{
    props.bebasKurang()
  }

  return (
    <div>
      <div className="wilayah">
        <select defaultValue='0' onChange={onChangeProv}>
          <option value="0" hidden>Pilih Provinsi</option>
          {renderProvinsi()}
        </select>
        <select defaultValue='0' onChange={onChangeKab}>
          <option value="0" hidden>Pilih Kabupaten</option>
          {renderKabupaten()}
        </select>
        <select defaultValue='0' onChange={onChangeKec}>
          <option value="0" hidden>Pilih Kecamatan</option>
          {renderKecamatan()}
        </select>
        <select defaultValue='0'>
          <option value="0" hidden>Pilih Kelurahan</option>
          {renderKelurahan()}
        </select>
      </div>
      <div className="mt-3">
        <h1>
          {props.bebas}
        </h1>
        <input type="number" value={angka} onChange={(e)=>setAngka(parseInt(e.target.value))}/>
        <button className="btn btn-success" onClick={tambahBebas}> + </button>
        <button className="btn btn-danger" onClick={kurangBebas}> - </button>
      </div>
    </div>
  )
}

const MapstatetoProps=(state)=>{
  return {
    bebas:state.angka
  }
}

export default connect(MapstatetoProps,{bebasTambah,bebasKurang}) (Product);