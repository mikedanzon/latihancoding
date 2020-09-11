import React,{ useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    //NavbarBrand,
    Nav,
    NavItem,
    //NavLink,
    NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';

//var didupdateCheck = 0;

const Header = (props) => {
const [isOpen, setIsOpen] = useState(false); // [isi data, function untuk ubah isi data]

const toggle = () => setIsOpen(!isOpen);

// const [nama, setNama] = useState('max');
// useEffect(()=>{
//     console.log('didmount');
// },[]) // didmount
// useEffect(()=>{
//     if(didupdateCheck) {
//         console.log('didupdate');
//     } else {
//         didupdateCheck++;
//     }
// },[nama]) // didupdate (kalo mau didupdate ke semua , apus []nya , jadi } aja tanpa array)
// useEffect(()=>{
//     return ()=>{
//         console.log('willumount')
//     }
// }) // willunmount

return (
    <div>
    <Navbar color="light" light expand="md">
        <Link to="/" className="font-weight-bold">reactstrap</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto ml-5" navbar>
            <NavItem className="mr-3">
            <Link to="/product">Product</Link>
            </NavItem>
            <NavItem>
            <Link to="/topic">Topics</Link>
            </NavItem>
            {/* <button onClick={()=>setNama('michael')}>{nama}</button> */}
        </Nav>
        <NavbarText>Michael Max</NavbarText>
        </Collapse>
    </Navbar>
    </div>
);
}

export default Header;