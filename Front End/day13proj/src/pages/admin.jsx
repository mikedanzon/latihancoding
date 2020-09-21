import React, { useState, useRef, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Header from '../components/header';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { priceFormatter } from '../helpers/idrcurrency';
import axios from 'axios';
import { URL_LOCALHOST } from '../helpers/url';
import { MdDeleteForever } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import './css/admin.css';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export default function StickyHeadTable(props) {
    const [modal, setModal] = useState(false)
    const [modaledit, setModalEdit] = useState(false)
    const [products, setProducts] = useState([])
    const [indexedit, setIndexEdit] = useState(0)
    const [addform, setAddForm] = useState({
        tripname:useRef(),
        photo:useRef(),
        startdate:useRef(),
        enddate:useRef(),
        price:'',
        description:useRef()
    })
    const [editform, setEditForm] = useState({
        tripname:useRef(),
        photo:useRef(),
        startdate:useRef(),
        enddate:useRef(),
        price:useRef(),
        description:useRef()
    })

    useEffect(()=>{
        axios.get(`${URL_LOCALHOST}/products`)
        .then((res)=>{
            setProducts(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const onPriceChange=(e)=>{
        if (e.target.value === '') {
            setAddForm({...addform,price:0})
        }
        if (Number(e.target.value)) {
            if (!isNaN(e.target.value)) {
                if (addform.price === 0) {
                    setAddForm({...addform,price:e.target.value[1]})
                } else {
                    setAddForm({...addform,price:e.target.value})
                }
            }
        }
    }

    const funAddDataClick=()=>{
        var tripname = addform.tripname.current.value;
        var photo = addform.photo.current.value;
        var startdate = addform.startdate.current.value;
        var checkstartdate = new Date(startdate).getTime();
        var enddate = addform.enddate.current.value;
        var checkenddate = new Date(enddate).getTime();
        var price = addform.price;
        var description = addform.description.current.value;
        var obj = {
            tripname,
            photo,
            startdate,
            enddate,
            price,
            description
        }
        if (checkstartdate > checkenddate || checkstartdate <= new Date().getTime()) {
            console.log("error")
        } else {
            axios.post(`${URL_LOCALHOST}/products`,obj)
            .then(()=>{
                axios.get(`${URL_LOCALHOST}/products`)
                .then((res)=>{
                    setProducts(res.data)
                    setAddForm({...addform,price:''})
                    setModal(false)
                    Toast.fire({
                        icon: 'success',
                        title: 'Data added successfully'
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    const toggle = () => setModal(!modal);
    const toggleedit = () => setModalEdit(!modaledit);

    // const readMore=(kata="")=>{
    //     const hitungkata = kata.split(" ").filter((val)=>val!=="").length
    //     if (hitungkata > 10) {
    //         var kataarray = kata.split(" ").map((val,index)=>index<11?val:"");
    //         var katafinale = kataarray.join(" ");
    //         return (
    //             <>
    //             {katafinale}
    //             <spam style={{color:"red"}}>Read more ..</spam>
    //             </>
    //         )
    //     }
    //     return kata
    // }

    const oneditclick=(index)=>{
        setModalEdit(true)
        setIndexEdit(index)
    }

    const onSaveEditClick=(id)=>{
        var objedit = {
            tripname:editform.tripname.current.value,
            photo:editform.photo.current.value,
            startdate:editform.startdate.current.value,
            enddate:editform.enddate.current.value,
            price:editform.price.current.value,
            description:editform.description.current.value
        }
        if (!isNaN(objedit.price)) {
            axios.put(`${URL_LOCALHOST}/products/${id}`,objedit)
            .then(()=>{
                axios.get(`${URL_LOCALHOST}/products`)
                .then((res)=>{
                    setProducts(res.data)
                    setModalEdit(false)
                    Toast.fire({
                        icon: 'success',
                        title: 'Data updated successfully'
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
                text: 'The price tag must be number only with no space!'
            })
        }
    }

    const renderData=()=>{
        return products.map((val,index)=>{
            return (
                <TableRow key={val.id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.tripname}</TableCell>
                    <TableCell>
                        <div>
                            <img width="80%" src={val.photo} alt="bali trip"/>
                        </div>
                    </TableCell>
                    <TableCell>{val.startdate}</TableCell>
                    <TableCell>{val.enddate}</TableCell>
                    <TableCell>{priceFormatter(val.price)}</TableCell>
                    <TableCell>{val.description}</TableCell>
                    <TableCell>
                        <span className="text-primary mr-2" onClick={()=>oneditclick(index)} style={{fontSize:30}}><BiEdit/></span>
                        <span className="text-danger ml-2" style={{fontSize:30}}><MdDeleteForever/></span>
                    </TableCell>
                </TableRow>
            )
        })
    }

    return (
        <>
        <Header/>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Data</ModalHeader>
            <ModalBody>
                <input type="text" ref={addform.tripname} placeholder="Trip Name" className="form-control mb-1"/>
                <input type="text" ref={addform.photo} placeholder="Photo url" className="form-control mb-1"/>
                <label className="ml-1">Starting Date:</label>
                <input type="date" ref={addform.startdate} placeholder="Start Date" className="form-control mb-1"/>
                <label className="ml-1">Ending Date:</label>
                <input type="date" ref={addform.enddate} placeholder="End Date" className="form-control mb-1"/>
                <input type="text" onChange={onPriceChange} placeholder="Rp . . ." value={addform.price} className="form-control mb-1"/>
                <textarea className="form-control" ref={addform.description} placeholder="Description" cols="30" rows="5"></textarea>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={funAddDataClick}>Post</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        {
            products.length ?
            <Modal isOpen={modaledit} toggle={toggleedit}>
            <ModalHeader toggle={toggleedit}>Edit Data {products.length?products[indexedit].tripname:''}</ModalHeader>
                <ModalBody>
                    <input type="text" defaultValue={products[indexedit].tripname} ref={editform.tripname} placeholder="Trip Name" className="form-control mb-1"/>
                    <input type="text" defaultValue={products[indexedit].photo} ref={editform.photo} placeholder="Photo url" className="form-control mb-1"/>
                    <label className="ml-1">Starting Date:</label>
                    <input type="date" defaultValue={products[indexedit].startdate} ref={editform.startdate} placeholder="Start Date" className="form-control mb-1"/>
                    <label className="ml-1">Ending Date:</label>
                    <input type="date" defaultValue={products[indexedit].enddate} ref={editform.enddate} placeholder="End Date" className="form-control mb-1"/>
                    <input type="text" ref={editform.price} placeholder="Rp . . ." defaultValue={products[indexedit].price} className="form-control mb-1"/>
                    <textarea className="form-control" defaultValue={products[indexedit].description} ref={editform.description} placeholder="Description" cols="30" rows="5"></textarea>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>onSaveEditClick(products[indexedit].id)}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggleedit}>Cancel</Button>
                </ModalFooter>
            </Modal>
            :
            null
        }
        <div className="px-5">
            <button className="btn button-add-data my-3" onClick={toggle}>
                Add data
            </button>
            <Paper style={{width:"100%"}}>
            <TableContainer style={{maxHeight:"440"}}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Trip Name</TableCell>
                        <TableCell style={{width:"17.5%"}}>Photo</TableCell>
                        <TableCell>Starting Date</TableCell>
                        <TableCell>Ending Date</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell style={{width:"17.5%"}}>Description</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderData()}
                </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </div>
        </>
    );
}