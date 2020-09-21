import React, { createRef, useEffect, useRef, useState } from 'react';
import './css/cart.css';
import Header from '../components/header';
import { connect } from 'react-redux';
import Axios from 'axios';
import { URL_LOCALHOST } from '../helpers/url';
import Notfound from '../pages/notfound';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { priceFormatter } from '../helpers/idrcurrency'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TableFooter } from '@material-ui/core';
import { Addtocart } from '../redux/actions/authactions';
import Swal from 'sweetalert2';

var creditCard = false;

const Cart=(props)=>{
    const [cart, setCart] = useState([])
    const [pilihan, setPilihan] = useState(0)
    const [pembayaran, setPembayaran] = useState({
        transfer: useRef(),
        creditc: useRef()
    })
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal);

    useEffect(()=>{
        Axios.get(`${URL_LOCALHOST}/carts?userId=${props.id}&_expand=product`)
        // Axios.get(`${URL_LOCALHOST}/carts`,{ // cara lain
        //     params:{
        //         userId:props.id,
        //         _expand:'product'
        //     }
        // })
        .then((res)=>{
            setCart(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const renderCart=()=>{
        return cart.map((val,index)=>{
            return (
                <TableRow key={val.id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.product.tripname}</TableCell>
                    <TableCell>
                        <div>
                            <img width="80%" src={val.product.photo} alt="bali trip"/>
                        </div>
                    </TableCell>
                    <TableCell>{val.qty}</TableCell>
                    <TableCell>{priceFormatter(val.product.price)}</TableCell>
                    <TableCell>{priceFormatter(val.product.price * val.qty)}</TableCell>
                </TableRow>
            )
        })
    }

    const renderTotalPrice=()=>{
        var total = cart.reduce((total,num)=>{
            return total + (num.product.price * num.qty) // di looping , total awal = 0
        },0)
        return total
    }

    // transactions ada id , status , userId , payment date , metode , payment proof
    // transactionsdetails ada id , transactions id , product , price , qty

    const onPaymentCC=()=>{
        if (creditCard) {
            Axios.post(`${URL_LOCALHOST}/transactions`,{
                status: 'Success',
                userId: props.id,
                paymentdate: new Date().getTime(),
                method:'creditcard',
                paymentproof:pembayaran.creditc.current.value
            }).then((res)=>{
                var arr = [];
                cart.forEach((val)=>{
                    arr.push(Axios.post(`${URL_LOCALHOST}/transactionsdetails`,{
                        transactionId: res.data.id,
                        productId: val.productId,
                        price: parseInt(val.product.price),
                        qty: val.qty,
                        userId: props.id
                    }))
                })
                Axios.all(arr).then(()=>{
                    var deletearr = []
                    cart.forEach((val)=>{
                        deletearr.push(Axios.delete(`${URL_LOCALHOST}/carts/${val.id}`))
                    })
                    Axios.all(deletearr)
                    .then(()=>{
                        Axios.get(`${URL_LOCALHOST}/carts?userId=${props.id}&_expand=product`)
                        .then((res1)=>{
                            setCart(res1.data)
                            toggle()
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        } else {
            Swal.fire({
                icon: 'error',
                text:`Credit card number is incorrect`
            })
        }
    }

    const onPaymentBank=()=>{
        Axios.post(`${URL_LOCALHOST}/transactions`,{
            status: 'WaitingAdmin',
            userId: props.id,
            paymentdate: new Date().getTime(),
            method:'banktransfer',
            paymentproof:pembayaran.transfer.current.value
        }).then((res)=>{
            var arr = [];
            cart.forEach((val)=>{
                arr.push(Axios.post(`${URL_LOCALHOST}/transactionsdetails`,{
                    transactionId: res.data.id,
                    productId: val.productId,
                    price: parseInt(val.product.price),
                    qty: val.qty
                }))
            })
            Axios.all(arr).then(()=>{
                var deletearr = []
                cart.forEach((val)=>{
                    deletearr.push(Axios.delete(`${URL_LOCALHOST}/carts/${val.id}`))
                })
                Axios.all(deletearr)
                .then(()=>{
                    Axios.get(`${URL_LOCALHOST}/carts?userId=${props.id}&_expand=product`)
                    .then((res1)=>{
                        setCart(res1.data)
                        toggle()
                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    const onPaymentClick=()=>{
        if (pilihan === 1) {
            props.Addtocart([])
            onPaymentBank()
        } else if (pilihan === 2) {
            props.Addtocart([])
            onPaymentCC()
        } else {
            alert("error , pilih dulu tipe pembayaran") // nanti ganti sweetalert
        }
    }

    const credit=(input)=>{
        var angka=0
        var output=0
        var y=input
        var a
        do {
            a=y%(10)
            var b 
            y=(y-a)/10
            if(angka%2==1){
                a*=2
                if(a>9){
                    b=a%10
                    output+=(b+1)
                } else {
                    output+=a 
                }
            } else {
                output+=a 
            }
            angka++
        } while (y>0);
        //console.log(angka)
        if(output%10==0){
            return creditCard = true 
        } else {
            return creditCard = false
        }
    }

    if (props.role !== 'user') {
        return <Notfound/>
    }

    return (
        <>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Payment Checkout</ModalHeader>
                <ModalBody>
                    <select onChange={(e)=>setPilihan(parseInt(e.target.value))} className="form-control" defaultValue={0}>
                        <option value="0" hidden>Select Payment Type</option>
                        <option value="1">Bank Transfer</option>
                        <option value="2">Credit Card</option>
                    </select>
                    {
                        pilihan === 1 ?
                        <input className="form-control" ref={pembayaran.transfer} placeholder="Bank Transfer Proof"></input>
                        :
                        pilihan === 2 ?
                        <input className="form-control" onChange={(e)=>{credit(e.target.value)}} ref={pembayaran.creditc} placeholder="Credit Card Number"></input>
                        :
                        null
                    }
                    <div>
                        Total Harga: {priceFormatter(renderTotalPrice())}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn button-add-data my-3" onClick={onPaymentClick}>
                        Pay
                    </button>
                </ModalFooter>
            </Modal>
            <Header/>
            <div className="pt-3" style={{paddingLeft:"15%",paddingRight:"15%"}}>
                <Paper style={{width:"100%"}}>
                <TableContainer style={{maxHeight:"440"}}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell style={{width:"17.5%"}}>Trip Name</TableCell>
                            <TableCell style={{width:"25%"}}>Photo</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderCart()}
                    </TableBody>
                    <TableFooter>
                        <TableCell colSpan={4}></TableCell>
                        <TableCell style={{fontWeight:"700",color:"black",fontSize:20}}>Subtotal Harga</TableCell>
                        <TableCell style={{color:"black",fontSize:20}}>{priceFormatter(renderTotalPrice())}</TableCell>
                    </TableFooter>
                    </Table>
                </TableContainer>
                </Paper>
                <button className="btn button-add-data my-3 float-right" onClick={toggle}>
                    Checkout
                </button>
            </div>
        </>
    )
}

const Mapstatetoprops=({Auth})=>{
    return {
        ...Auth
    }
}

export default connect(Mapstatetoprops,{Addtocart}) (Cart);