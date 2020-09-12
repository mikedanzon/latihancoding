import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import { MdAddCircleOutline, MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Home=(props)=>{
    const [datapost,setDataPost] = useState([])
    // const [author,setAuthor] = useState()
    // const [title,setTitle] = useState()
    const inputAuthor = useRef()
    const inputTitle = useRef()

    useEffect(()=>{
        axios.get('http://localhost:4000/posts')
        .then((res)=>{
            inputAuthor.current.focus();
            setDataPost(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const renderPost=()=>{
        return datapost.map((val,index)=>{
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.author}</td>
                    <td>{val.title}</td>
                    <td>
                    <Link to={{
                        pathname:`/comments/${val.id}`,
                        state:{data:val}
                    }}>
                        <button className="btn btn-primary mr-3">Ke Comment</button>
                    </Link>
                    <button className="btn btn-danger" onClick={()=>onDeleteClick(val.id,index)}><MdDeleteForever className="mb-1"/> Delete</button>
                    </td>
                </tr>
            )
        })
    }

    // onChange={(e)=>authorChange(e.target.value)}

    const onKeyUpAuthor=(e)=>{
        if (e.keyCode === 13) {
            inputTitle.current.focus();
        }
    }

    const onKeyUpTitle=(e)=>{
        if (e.keyCode === 13) {
            addPostClick();
        }
    }

    const addPostClick=()=>{
        var author = inputAuthor.current.value;
        var title = inputTitle.current.value;
        axios.post('http://localhost:4000/posts',{
            author,
            title
        }).then(()=>{
            axios.get('http://localhost:4000/posts')
            .then((res)=>{
                inputAuthor.current.value='';
                inputTitle.current.value='';
                inputAuthor.current.focus()
                setDataPost(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    const onDeleteClick=(e,index)=>{
        Swal.fire({
            title: `Are you sure to delete ${datapost[index].author}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:4000/posts/${e}`)
                .then(()=>{
                    axios.get('http://localhost:4000/posts')
                    .then((res)=>{
                        setDataPost(res.data)
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }
          })
    }

    return (
        <div className="d-flex flex-column align-items-center pt-5">
            <h1>List buku perpustakaan Ngabubulan</h1>
            <div className="mt-3 mb-3 d-flex flex-column align-items-center">
                <input type="text" className="form-control mb-3" ref={inputAuthor} onKeyUp={onKeyUpAuthor} placeholder="author"/>
                <input type="text" className="form-control mb-3" ref={inputTitle} onKeyUp={onKeyUpTitle} placeholder="title"/>
                <button className="btn btn-outline-dark" onClick={addPostClick}>
                    <MdAddCircleOutline className="pb-1" style={{fontSize:22}}/> Add
                </button>
            </div>
            <div className="w-50">
                <Table striped>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Author</th>
                            <th>Judul</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPost()}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Home;