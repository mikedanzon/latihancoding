import React from 'react';
import Homeimage from '../assets/homescreen.webp';
import Travelbook from '../assets/travelbook.svg';
import Travelers from '../assets/travelers.svg';
import Header from '../components/header';
import './css/home.css';
import { Link } from 'react-router-dom';

const Home=(props)=>{
    return (
        <>
        <Header/>
            <div>
                <div style={{height:"90vh", width:"100%"}}>
                    <img src={Homeimage} style={{objectFit:"cover"}} alt="background image" width="100%" height="100%"/>
                </div>
                <div className="text-white d-flex align-items-center px-5" style={{height:"8vh", backgroundColor:"#FF8F54", justifyContent:"space-between"}}>
                    <div>
                        Promo
                    </div>
                    <div>
                        <Link to='/products'>
                            <button className="btn button-promo">
                                Lihat Promo
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="row p-0 m-0 mt-4">
                    <div className="col-md-6 p-5">
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias dolore rem vitae in suscipit ipsam minus expedita debitis possimus</h2>
                    </div>
                    <div className="col-md-6 pr-5">
                        <img src={Travelbook} alt="Travel Booking" width="100%"/>
                    </div>
                </div>
                <div className="row p-0 m-0 mt-4 mb-4">
                    <div className="col-md-6 pl-5">
                        <img src={Travelers} alt="Travel Booking" width="100%" height="400px"/>
                    </div>
                    <div className="col-md-6 p-5">
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias dolore rem vitae in suscipit ipsam minus expedita debitis possimus</h2>
                    </div>
                </div>
                <div className="text-white d-flex justify-content-center align-items-center" style={{height:"20vh", backgroundColor:"#FE6B8B"}}>
                    <h1>Mau Gabung?</h1>
                </div>
            </div>
        </>
    )
}

export default Home;