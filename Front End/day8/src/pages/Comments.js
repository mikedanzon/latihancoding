import React, { useState, useEffect } from 'react';
import axios from 'axios';

// props.match.params.id

const Comments=(props)=>{
    const [datacomments,setDataComments] = useState([])

    // useEffect(()=>{
    //     axios.get('http://localhost:4000/comments')
    //     .then((res)=>{
    //         setDataComments(res.data)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // },[])

    useEffect(()=>{
        axios.get(`http://localhost:4000/comments?postId=${props.match.params.id}`)
        .then((res)=>{
            setDataComments(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    var data = props.location.state.data

    const renderComment=()=>{
        return datacomments.map((val,index)=>{
            return (
                <div key={index}>
                    {val.body}
                </div>
            )
        })
    }

    return (
        <div className="d-flex flex-column align-items-center pt-5">
            <div>
                name: {data.author}
            </div>
            <div>
                title: {data.title}
            </div>
            {renderComment()}
        </div>
    )
}

export default Comments;