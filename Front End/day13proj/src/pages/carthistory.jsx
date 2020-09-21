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
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const Carthistory=(props)=>{
    const [carts, setCarts] = useState([])
    const [details, setDetails] = useState([])
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal);

    useEffect(()=>{
        Axios.get(`${URL_LOCALHOST}/transactions?userId=${props.id}`)
        .then((res)=>{
            setCarts(res.data)
            Axios.get(`${URL_LOCALHOST}/transactionsdetails?userId=${props.id}`)
            .then((res1)=>{
                setDetails(res1.data)
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const renderCart=()=>{
        return carts.map((val,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.method}</TableCell>
                    <TableCell>{dateformat(val.paymentdate)}</TableCell>
                    <TableCell>
                        <button onClick={toggle} className="btn button-promo">
                            Details
                        </button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    const renderDetails=()=>{
        return details.map((val,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.productId}</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>{val.qty}</TableCell>
                    <TableCell>{priceFormatter(val.price/val.qty)}</TableCell>
                    <TableCell>{priceFormatter(val.price)}</TableCell>
                </TableRow>
            )
        })
    }

    return (
        <>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Details</ModalHeader>
            <ModalBody>
                <Paper>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Product Photo</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderDetails()}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
            </ModalBody>
            <ModalFooter>
                <button className="btn button-add-data my-3" onClick={toggle}>
                    Ok
                </button>
            </ModalFooter>
        </Modal>
        <div>
            <Header/>
            <div className="px-5 d-flex justify-content-center mt-5">
                <Paper style={{width:"50%"}}>
                <TableContainer style={{maxHeight:"440"}}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Payment Date</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderCart()}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
            </div>
        </div>
        </>
    )
}

const Mapstatetoprops=({Auth})=>{
    return {
        ...Auth
    }
}

export default connect(Mapstatetoprops) (Carthistory);