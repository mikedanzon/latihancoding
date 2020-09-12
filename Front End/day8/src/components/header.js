import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
    <Navbar color="light" light expand="md">
        <Link to="/" className="font-weight-bold">HOME</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto ml-5" navbar>
            <NavItem className="mr-3">
            <Link to="/comments">Comment</Link>
            </NavItem>
            <NavItem className="mr-3">
            <Link to="/hitung">Hitung</Link>
            </NavItem>
        </Nav>
        <NavbarText>Jumlah Kata: {props.Hitungkata.jumlahkata}</NavbarText>
        </Collapse>
    </Navbar>
    </div>
  );
}

const Mapstatetoprops=(state)=>{
  return {
    Hitungkata:state.hitungkata
  }
}

export default connect (Mapstatetoprops)(Header);