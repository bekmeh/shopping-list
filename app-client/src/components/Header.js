import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';

// import './Header.css';

class Header extends Component {

  state = {
    
  };

  render() {
    return (
      <Navbar>
        <NavbarBrand>Shopping List</NavbarBrand>
        {/* <Nav>
            <NavItem>
                <NavLink>
                    Home
                </NavLink>
            </NavItem>
        </Nav> */}
      </Navbar>
    );
  }
}

export default Header;
