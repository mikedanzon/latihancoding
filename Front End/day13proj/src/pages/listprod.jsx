import React, { useEffect, useState } from 'react';
import './css/listprod.css';
import Header from '../components/header';
import Axios from 'axios';
import { URL_LOCALHOST } from '../helpers/url';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { priceFormatter } from '../helpers/idrcurrency';

const Listprod=(props)=>{
    const [products, setProducts] = useState([])

    useEffect(()=>{
        Axios.get(`${URL_LOCALHOST}/products`)
        .then((res)=>{
            setProducts(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const renderCard=()=>{
        return products.map((val,index)=>{
            return (
                <div key={val.id} className="col-md-3 px-2 py-2">
                    <Link to={`/products/${val.id}`}>
                        <Card className="carde card-rounded">
                            <CardImg top width="100%" className="card-rounded" height={200} style={{objectFit:"cover"}} src={val.photo} alt="Card image cap" />
                            <div class="overlay card-rounded">
                                <div class="text">
                                    <div>
                                        {val.tripname}
                                    </div>
                                    <div>
                                        {priceFormatter(val.price)}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>
            )
        })
    }

    return (
        <>
            <Header/>
            <div className="pt-3 px-4">
                <Breadcrumb className="bg-transparent m-0 px-2">
                    <BreadcrumbItem><Link className="link-class" to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Products</BreadcrumbItem>
                </Breadcrumb>
                <div className="row p-0 m-0">
                    {renderCard()}
                </div>
            </div>
        </>
    )
}

export default Listprod;