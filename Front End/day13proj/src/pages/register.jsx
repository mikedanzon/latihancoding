import React, { useEffect, useRef, useState } from 'react';
import './css/register.css';
import Photo from '../assets/homescreen.webp';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { URL_LOCALHOST } from '../helpers/url';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import Axios from 'axios';
import Loading from '../components/loading';

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

const Register=(props)=>{
    const classes = useStyles();
    //const [logincheck, setLoginCheck] = useState([])
    const [datausers, setDataUsers] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const [registerform, setRegisterForm] = useState({
        username: useRef(),
        password: useRef(),
        password2: useRef()
    })

    useEffect(()=>{
        axios.get(`${URL_LOCALHOST}/users`)
        .then((res)=>{
            setDataUsers(res.data)
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const onRegisterClick=()=>{
        setIsLoading(true)
        var username = registerform.username.current.value;
        var password = registerform.password.current.value;
        var password2 = registerform.password2.current.value;
        for (var i = 0; i < datausers.length; i++) {
            if (datausers[i].username == username) {
                setIsLoading(false)
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Your username is taken please use a different one'
                })
            }
        }
        if (password !== password2) {
            setIsLoading(false)
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your password and confirm password is not the same'
            })
        }
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) { // test password min 6 huruf/angka , 1 angka , 1 huruf
            Axios.post(`${URL_LOCALHOST}/users`,{
                username:username,
                password:password,
                role:"user"
            }).then((res)=>{
                setIsLoading(false)
                Swal.fire({
                    title: 'Success',
                    text: "Do you want to login now ?",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes !'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = "//localhost:3000/login"
                    }
                })
            }).catch((err)=>{
                console.log(err)
            })
        } else {
            setIsLoading(false)
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your password must have 6 characters include 1 number and 1 letter'
            })
        }
        // if (username !== datausers.username && password !== datausers.password) {
        //     console.log(datausers) // musti di looping
        // }
        // axios.get(`${URL_LOCALHOST}/users`)
        // .then((res)=>{
        //     //setLoginCheck(res.data)
        //     setDataUsers(res.data)
        //     if (res.data.length) {
        //         // ngecek username dan password , lalu cek password min 6 character ada huruf dan angka
        //         setIsLoading(false)
        //     } else {
        //         setIsLoading(false)
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: 'Your username or password is taken'
                // })
        //     }
        // }).catch((err)=>{
        //     console.log(err)
        // })
    }

    if (isloading) {
        return (
            <div>
                <Loading/>
            </div>
        )
    }

    if (props.isLogin) {
        window.location = "//localhost:3000"
    }

    return (
        <div className="row m-0 p-0">
            <div className="col-md-6 m-0 p-0 d-flex justify-content-center align-items-center" style={{background:'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>
                <div className="login-box d-flex px-4" style={{height:"40%"}}>
                    <h1 className="align-self-center">Register</h1>
                    <div className="mt-3">
                        <TextField className={classes.root} inputRef={registerform.username} id="outlined-basic" label="Username" fullWidth="true" variant="outlined" size="small" />
                    </div>
                    <div className="mt-3">
                        <TextField className={classes.root} inputRef={registerform.password} type="password" id="outlined-basic" label="Password" fullWidth="true" variant="outlined" size="small" />
                    </div>
                    <div className="mt-3">
                        <TextField className={classes.root} inputRef={registerform.password2} type="password" id="outlined-basic" label="Confirm Password" fullWidth="true" variant="outlined" size="small" />
                    </div>
                    <div className="d-flex mt-4 align-self-center">
                        {
                            isloading ?
                            <button disabled className="px-3 py-2 rounded text-white" style={{border:"white 1px solid",backgroundColor:"transparent"}}>
                                Register
                            </button>
                            :
                            <button onClick={onRegisterClick} className="px-3 py-2 rounded text-white" style={{border:"white 1px solid",backgroundColor:"transparent"}}>
                                Register
                            </button>
                        }
                    </div>
                </div>
            </div>
            <div className="col-md-6 m-0 p-0" style={{height:"100vh"}}>
                <img width="100%" height="100%" style={{objectFit:"cover"}} src={Photo} alt="background image"/>
            </div>
        </div>
    )
}

const Mapstatetoprops=({Auth})=>{
    return {
        ...Auth
    }
}

export default connect (Mapstatetoprops) (Register);