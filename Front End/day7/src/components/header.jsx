import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import '../App.css';

const Header=()=>{
    return (
        <div>
            <Nav>
                <NavItem>
                <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="/product">Product</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="/topic">Topic</NavLink>
                </NavItem>
                {/* <NavItem>
                <NavLink disabled href="/">Disabled Link</NavLink>
                </NavItem> */}
            </Nav>
        </div>
    )
}

export default Header;