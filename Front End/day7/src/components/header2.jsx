import React,{ useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = (props) => {
const [isOpen, setIsOpen] = useState(false); // [isi data, function untuk ubah isi data]

const toggle = () => setIsOpen(!isOpen);

return (
    <div>
    <Navbar color="light" light expand="md">
        <Link to="/" className="font-weight-bold">HOME</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto ml-5" navbar>
            <NavItem className="mr-3">
            <Link to="/product">Product</Link>
            </NavItem>
            <NavItem className="mr-3">
            <Link to="/topic">Topics</Link>
            </NavItem>
            <NavItem>
            <Link to="/parkir">Parkir</Link>
            </NavItem>
            {/* <button onClick={()=>setNama('michael')}>{nama}</button> */}
        </Nav>
        <NavbarText>Parkir<br/>0 Jam<br/>Total Rp 0</NavbarText>
        </Collapse>
    </Navbar>
    </div>
);
}

export default Header;