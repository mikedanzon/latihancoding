import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/header';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { URL_LOCALHOST } from '../helpers/url';
import Axios from 'axios';
import { dateformat, priceFormatter } from '../helpers/idrcurrency'

const Carthistory=(props)=>{
    const [wadmin, setWadmin] = useState([])
    const [total, setTotal] = useState([])

    useEffect(()=>{
        Axios.get(`${URL_LOCALHOST}/transactions?status=WaitingAdmin`)
        .then((res)=>{
            setWadmin(res.data)
            Axios.get(`${URL_LOCALHOST}/transactionsdetails`)
            .then((res1)=>{
                setTotal(res1.data)
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const onAcceptClick=()=>{
        //Axios.patch(`${URL_LOCALHOST}/transactions`)
    }

    const renderWaiting=()=>{
        return wadmin.map((val,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.method}</TableCell>
                    <TableCell>{priceFormatter(parseInt(total.price * total.qty))}</TableCell>
                    <TableCell>
                        <button onClick={onAcceptClick} className="btn button-promo">
                            Accept
                        </button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    return (
        <div>
            <Header/>
            <div className="px-5 d-flex justify-content-center mt-5">
                <Paper style={{width:"50%"}}>
                <TableContainer style={{maxHeight:"440"}}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell>Total Price</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderWaiting()}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
            </div>
        </div>
    )
}

const Mapstatetoprops=({Auth})=>{
    return {
        ...Auth
    }
}

export default connect(Mapstatetoprops) (Carthistory);