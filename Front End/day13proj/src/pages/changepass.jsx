import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { URL_LOCALHOST } from '../helpers/url';
import Header from '../components/header';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';

const Changepass=(props)=>{
    const [userdata, setUserData] = useState([])
    const [userpass, setUserPass] = useState([])
    const [passform, setPassForm] = useState({
        password: useRef(),
        passwordbaru: useRef(),
        passwordbaru2: useRef()
    })

    useEffect(()=>{
        Axios.get(`${URL_LOCALHOST}/users`)
        .then((res)=>{
            setUserData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const onClickPassword=()=>{
        var password = passform.password.current.value;
        var passwordbaru = passform.passwordbaru.current.value;
        var passwordbaru2 = passform.passwordbaru2.current.value;
        if (passwordbaru == passwordbaru2) {
            if (password = props.password) {
                for (var i=0;i < userdata.length; i++) {
                    if (userdata[i].username == props.username) {
                        Axios.patch(`${URL_LOCALHOST}/users?userId=${props.username}`,{
                            password:passwordbaru
                        })
                        .then(()=>{
                            passform.password.current.value = ""
                            passform.passwordbaru.current.value = ""
                            passform.passwordbaru2.current.value = ""
                        }).catch((err)=>{
                            console.log(err)
                        })
                        return alert("success")
                    }
                }
            } else {
                alert("password salah")
            }
        } else {
            Swal.fire({
                icon:"error",
                text:"Please check confirm password again"
            })
        }
    }

    return (
        <div>
            <Header/>
            <div className="mt-5">
                <div className="mb-3">
                    <input placeholder="Masukan Password Lama" ref={passform.password}/>
                </div>
                <div className="mb-3">
                    <input placeholder="Masukan Password Baru" ref={passform.passwordbaru}/>
                </div>
                <div className="mb-3">
                    <input placeholder="Confirm Password Baru" ref={passform.passwordbaru2}/>
                </div>
                <button onClick={onClickPassword}>Ganti Password</button>
            </div>
        </div>
    )
}

const Mapstatetoprops=({Auth})=>{
    return {
        ...Auth
    }
}

export default connect(Mapstatetoprops) (Changepass);