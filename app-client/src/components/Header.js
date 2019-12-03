import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand
  } from 'reactstrap';

class Header extends Component {

  render() {
    return (
      <Navbar>
        <NavbarBrand>Shopping List</NavbarBrand>
      </Navbar>
    );
  }
}

export default Header;
