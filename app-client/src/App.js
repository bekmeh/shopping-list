import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';

import Header from './components/Header.js';
import List from './components/List.js';
import './App.css';

class App extends Component {

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
      <div className="App">
        <Container>
          <Header/>
          <List/>
        </Container>
      </div>
    );
  }
}

export default App;
