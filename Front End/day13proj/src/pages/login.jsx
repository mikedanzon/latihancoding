import React, { useRef, useState, useEffect } from 'react';
import './css/login.css';
import Photo from '../assets/homescreen.webp';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { URL_LOCALHOST } from '../helpers/url';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LoginFunc } from '../redux/actions';

const useStyles = makeStyles(() => ({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
                border: '3px solid',
                color: 'white',
            },
        },
    },
}));

const Login=(props)=>{
    const classes = useStyles();
    const [logindata, setLoginData] = useState([])
    const [logincheck, setLoginCheck] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [loginform, setLoginForm] = useState({
        username: useRef(),
        password: useRef()
    })

    useEffect(()=>{
        axios.get(`${URL_LOCALHOST}/users`)
        .then((res)=>{
            setLoginData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const onLoginClick=()=>{
        setIsLoading(true) // ga langsung update ada delay cari google
        console.log(isloading)
        var username = loginform.username.current.value;
        var password = loginform.password.current.value;
        axios.get(`${URL_LOCALHOST}/users?username=${username}&password=${password}`)
        .then((res)=>{
            setLoginCheck(res.data)
            if (res.data.length) {
                localStorage.setItem('id',res.data[0].id)
                props.LoginFunc(res.data[0])
                setIsLoading(false)
            } else {
                setIsLoading(false)
                console.log('user salah id atau password') // nanti buat handle error cek password kalo id nya bener
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    if (props.isLogin) {
        return <Redirect to='/'/>
    }

    return (
        <div className="row m-0 p-0">
            <div className="col-md-6 m-0 p-0" style={{height:"100vh"}}>
                <img width="100%" height="100%" style={{objectFit:"cover"}} src={Photo} alt="background image"/>
            </div>
            <div className="col-md-6 m-0 p-0 d-flex justify-content-center align-items-center" style={{background:'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>
                <div className="login-box d-flex px-4" style={{height:"40%"}}>
                    <h1 className="align-self-center">Login</h1>
                    <div className="mt-3">
                        <TextField className={classes.root} inputRef={loginform.username} id="outlined-basic" label="Username" fullWidth="true" variant="outlined" size="small" />
                    </div>
                    <div className="mt-3">
                        <TextField className={classes.root} inputRef={loginform.password} type="password" id="outlined-basic" label="Password" fullWidth="true" variant="outlined" size="small" />
                    </div>
                    <div className="mt-4 align-self-center">
                        {
                            isloading ?
                            <button disabled className="px-3 py-2 rounded text-white" style={{border:"white 1px solid",backgroundColor:"transparent"}}>
                                Login
                            </button>
                            :
                            <button onClick={onLoginClick} className="px-3 py-2 rounded text-white" style={{border:"white 1px solid",backgroundColor:"transparent"}}>
                                Login
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const Mapstatetoprops=({Auth})=>{
    return {
        ...Auth
    }
}

export default connect (Mapstatetoprops,{LoginFunc}) (Login);