import React, { useEffect, useState } from 'react';
import Home from './pages/home';
import ManageAdmin from './pages/admin';
import Login from './pages/login';
import Product from './pages/listprod';
import Detailprod from './pages/detailprod';
import Cart from './pages/cart';
import Register from './pages/register';
import Cpass from './pages/changepass';
import Managepay from './pages/managepayment';
import Carthistory from './pages/carthistory';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { LoginFunc } from './redux/actions';
import axios from 'axios';
import { URL_LOCALHOST } from './helpers/url';
import Notfound from './pages/notfound';
import Loading from './components/loading';

// yang belom dilakuin (Ada juga yang musti di cek , tapi udah lewat ujian biarkan saja)
// • ganti warna background div promo , ganti warna button , buat footer [nanti]
// • edit readmore di admin (ada library readmore) [nanti]
// • ganti foto admin semua cari yang tengahnya bagus , cek react reveal
// • kalo di cart product sama musti di gabung otomatis (qty aja yang nambah)
// • filter product + admin page + tambahin proteksi di semua
// • buat page abis bayar redirect ato buat popup terima kasih gitu
// • ganti tanggal jika cart tanggal udah lewat hilang

function App(props) {
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    var id = localStorage.getItem('id');
    if (id) {
      axios.get(`${URL_LOCALHOST}/users/${id}`)
      .then((res)=>{
        axios.get(`${URL_LOCALHOST}/carts?userId=${res.data.id}&_expand=product`)
        .then((res1)=>{
            props.LoginFunc(res.data,res1.data)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
          setLoading(false)
        })
      }).catch((err)=>{
        console.log(err)
      })
    } else {
      setLoading(false)
    }
  },[])

  const pathProtectedAdmin=()=>{
    if (props.role === 'admin') {
      return (
        <Switch>
            <Route exact path='/manageAdmin' component={ManageAdmin}/>
            <Route path='*' component={Notfound} />
        </Switch>
      )
    }
  }

  if (loading) {
    return (
      <div>
        <Loading/>
      </div>
    )
  }

  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/products' component={Product}/>
        <Route path='/products/:id' component={Detailprod}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/register' component={Register}/>
        <Route path='/changepass' component={Cpass}/>
        <Route path='/managepayment' component={Managepay}/>
        <Route path='/history' component={Carthistory}/>
        {pathProtectedAdmin()}
        <Route path='*' component={Notfound} />
      </Switch>
    </div>
  );
}

const Mapstatetoprops=({Auth})=>{
  return {
    ...Auth
  }
}

export default connect(Mapstatetoprops,{LoginFunc}) (App);