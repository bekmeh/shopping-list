import React, { Component } from 'react';
import logo from './logo.svg';
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
        <header className="App-header">
          <h2>items</h2>
          {
            items.map(item =>
            <div key={item.id}>
              {item.id} - {item.name} - £{item.price}
            </div>)
          }
        </header>
      </div>
    );
  }
}

export default App;
