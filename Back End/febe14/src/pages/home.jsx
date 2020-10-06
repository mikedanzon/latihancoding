import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Table } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Home(props) {
    const { buttonLabel, className } = props;
    const [datakaryawan, setDatakaryawan] = useState([])
    const [page, setPage] = useState(1)
    const [addform, setAddForm] = useState({
        nama: '',
        usia: '',
        berat: '',
        kota: '',
        th: ''
    })

    useEffect(() => {
        fetchdata()
    }, [])

    useEffect(() => {
        fetchdata()
    }, [page])

    const fetchdata = async () => {
        try {
            var res = await Axios.get(`http://localhost:5000/karyawans?page=${page}`)
            setDatakaryawan(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeAdd = (e, property) => {
        setAddForm({ ...addform, [property]: e.target.value })
    }

    const onAddClick = () => {
        Axios.post(`http://localhost:5000/karyawans`, addform)
            .then((res) => {
                setDatakaryawan(res.data)
                setAddForm({
                    nama: '',
                    usia: '',
                    berat: '',
                    kota: '',
                    th: ''
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    const onDeleteClick = (id) => {
        var confirm = window.confirm('yakin hapus data ?')
        if (confirm) {
            Axios.delete(`http://localhost:5000/karyawans/${id}`)
                .then((res) => {
                    setDatakaryawan(res.data)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }

    const renderTable = () => {
        return datakaryawan.map((val, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{val.nama}</td>
                    <td>{val.usia}</td>
                    <td>{val.berat}</td>
                    <td>{val.kota}</td>
                    <td>{val.th}</td>
                    <td>
                        <button className="btn btn-primary mr-2" onClick={toggle}>Edit</button>
                        <button className="btn btn-danger" onClick={() => onDeleteClick(val.no)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    const pindahpage = (a) => {
        setPage(a)
    }

    const renderPaging = () => {
        var jumlahpage = Math.ceil(10 / 5)
        var arr = new Array(jumlahpage)
        for (let i = 0; i < arr.length; i++) {
            if ((i + 1) === page) {
                arr[i] = (
                    <PaginationItem key={i} disabled>
                        <PaginationLink>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                )
            } else {
                arr[i] = (
                    <PaginationItem key={i} onClick={() => pindahpage(i + 1)}>
                        <PaginationLink>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                )
            }
        }
        return arr
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Edit</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Save</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center'>
                <div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Weight</th>
                                <th>City</th>
                                <th>Year</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTable()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>#</th>
                                <td><input type="text" value={addform.nama} onChange={(e) => onChangeAdd(e, 'nama')} placeholder='input name' /></td>
                                <td><input type="number" value={addform.usia} onChange={(e) => onChangeAdd(e, 'usia')} placeholder='input age' /></td>
                                <td><input type="number" value={addform.berat} onChange={(e) => onChangeAdd(e, 'berat')} placeholder='input weight' /></td>
                                <td><input type="text" value={addform.kota} onChange={(e) => onChangeAdd(e, 'kota')} placeholder='input city' /></td>
                                <td><input type="number" value={addform.th} onChange={(e) => onChangeAdd(e, 'th')} placeholder='input year' /></td>
                                <td>
                                    <button className="btn btn-success" onClick={onAddClick}>Add</button>
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                    <Pagination aria-label="Page navigation example">
                        {renderPaging()}
                    </Pagination>
                </div>
            </div>
        </>
    );
}

export default Home;