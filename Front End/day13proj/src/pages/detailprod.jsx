import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/header';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardBody } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './css/detailprod.css';
import Axios from 'axios';
import { URL_LOCALHOST } from '../helpers/url';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import Loading from '../components/loading';
import { Addtocart } from '../redux/actions/authactions';

function Detailprod(props) {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState({})
    const [cartuser, setCartUser] = useState({})
    const [usir, setUsir] = useState(false)
    const qty = useRef()

    useEffect(()=>{
        Axios.get(`${URL_LOCALHOST}/products/${props.match.params.id}`)
        .then((res)=>{
            setProducts(res.data)
            Axios.get(`${URL_LOCALHOST}/carts?userId=${props.id}`)
            .then((res1)=>{
                setCartUser(res1.data)
                setLoading(false)
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const onCartClick=()=>{
        if (props.role === 'admin') {
            Swal.fire('Admin cannot add to cart')
        } else if (props.role === 'user') {
            if (qty.current.value) {
                for (var i = 0; i < cartuser.length; i++) {
                    if (cartuser[i].productId == products.id) {
                        var tambah = cartuser[i].qty + parseInt(qty.current.value)
                        Axios.patch(`${URL_LOCALHOST}/carts/${cartuser[i].id}`,{
                            qty: tambah
                        })
                        .then(()=>{
                            qty.current.value = ""
                        }).catch((err)=>{
                            console.log(err)
                        })
                        return Swal.fire({
                            icon: 'success',
                            text: 'This item has been updated on your cart'
                        })
                    }
                }
                Swal.fire({
                    text: "Are you sure to add this trip to your cart ?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes !'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Axios.post(`${URL_LOCALHOST}/carts`,{
                            userId:props.id,
                            productId: products.id,
                            qty: parseInt(qty.current.value)
                        }).then(()=>{
                            Axios.get(`${URL_LOCALHOST}/carts`,{
                                params:{
                                    userId:props.id,
                                    _expand:'product'
                                }
                            }).then((res)=>{
                                props.Addtocart(res.data)
                                window.location = `//localhost:3000/products/${products.id}`
                            }).catch((err)=>{
                                console.log(err)
                            })
                        })            
                    }
                }) 
            } else {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You have to put quantity before add to cart'
                })
            }
        } else {
            Swal.fire('Please login before using the cart')
            .then((result)=>{
                if (result.isConfirmed) {
                    setUsir(true)
                } else {
                    setUsir(true)
                }
            })
        }
    }

    if (loading) {
        return (
            <div>
                <Loading/>
            </div>
        )
    }

    if (usir) {
        return <Redirect to="/login"/>
    }

    return (
        <div>
            <Header/>
            <div className="pt-3 px-4">
                <Breadcrumb className="m-0 bg-transparent px-2">
                    <BreadcrumbItem><Link className="link-class" to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link className="link-class" to="/products">Products</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{products.tripname}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div style={{width:"100%",height:300}}>
                <img src={products.photo} style={{objectFit:"cover",objectPosition:"center"}} height="100%" width="100%" alt="a photo"/>
                <h5 className="mt-2">Start Date: {products.startdate}</h5>
                <h5 className="mt-2">End Date: {products.enddate}</h5>
                <h2 className="mt-2">{products.tripname}</h2>
                <label>Jumlah Tiket</label>
                <input type="number" className="form-control" placeholder="Quantity" style={{width:200}} ref={qty}/>
                <button className="btn button-promo mt-2" onClick={onCartClick}>
                    Add to cart
                </button>
                <div className="mt-3 mb-3">
                    {products.description}
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

export default connect(Mapstatetoprops,{Addtocart}) (Detailprod);