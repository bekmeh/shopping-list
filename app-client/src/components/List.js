import React, { Component } from 'react';
import {
    Row,
    Col
  } from 'reactstrap';

// import './Header.css';

class Header extends Component {

  state = {
    isLoading: true,
    items: []
  };

  async componentDidMount() {
    const response = await fetch('/items');
    const body = await response.json();
    this.setState({ items: body, isLoading: false });
  }

  render() {
    const {items, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    return (
      <Row>
        <Col></Col>
        <Col>
          <h2>items</h2>
          <ul>
            {
              items.map(item =>
              <li key={item.id}>
                {item.id} - {item.name} - £{item.price}
              </li>)
            }
          </ul>
        </Col>
        <Col></Col>
      </Row>
    );
  }
}

export default Header;
