import React, { useEffect, useState } from 'react';
import Home from './pages/home';
import ManageAdmin from './pages/admin';
import Login from './pages/login';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { LoginFunc } from './redux/actions';
import axios from 'axios';
import { URL_LOCALHOST } from './helpers/url';

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
        <Route exact path='/manageAdmin' component={ManageAdmin}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </div>
  );
}

export default connect(null,{LoginFunc}) (App);
