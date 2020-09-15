import React, { useEffect, useState } from 'react';
import Home from './pages/home';
import ManageAdmin from './pages/admin';
import Login from './pages/login';
import Product from './pages/listprod';
import Detailprod from './pages/detailprod';
import Cart from './pages/cart';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { LoginFunc } from './redux/actions';
import axios from 'axios';
import { URL_LOCALHOST } from './helpers/url';
import Notfound from './pages/notfound';

function App(props) {
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    var id = localStorage.getItem('id');
    if (id) {
      axios.get(`${URL_LOCALHOST}/users/${id}`)
      .then((res)=>{
        props.LoginFunc(res.data)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setLoading(false)
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
        Loading . . .
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