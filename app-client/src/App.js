import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Header from './components/Header.js';
import List from './components/List.js';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Container>
          <Header />
          <List />
        </Container>
      </div>
    );
  }
}

export default App;
