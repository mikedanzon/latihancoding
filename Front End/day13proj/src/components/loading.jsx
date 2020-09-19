import React from 'react';
import Loader from 'react-loader-spinner'

const Loading=()=>{
    return (
        <div style={{height:"100vh"}} className="d-flex justify-content-center">
            <Loader type="Rings" color="orange" height={"100%"} width={100} />
        </div>
    )
}

export default Loading;