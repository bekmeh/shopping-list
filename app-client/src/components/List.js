import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {
    Row,
    Col
  } from 'reactstrap';

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

  onDragOver = dragLocationIndex => {
    const currentlyDraggingItem = this.state.items[dragLocationIndex];
    this.dragLocationIndex = dragLocationIndex;

    if (this.draggedItem === currentlyDraggingItem) {
      // It's being dragged over itself, so ignore
      return;
    }

    // Remove dragged item fron the main item list
    let items = this.state.items.filter(item => item !== this.draggedItem);

    // Move dragged item's position in the item list
    items.splice(dragLocationIndex, 0, this.draggedItem);

    // Update items list
    this.setState({ items });
  };

  onDragStart = (e, index) => {
    this.draggedItem = this.state.items[index];
    this.startIndex = index;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  async onDragEnd() {
    let items = this.state.items;

    this.state.items.forEach((item, index) => {
      items[index].orderIndex = index;
    });

    await fetch('/items', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    });

    this.setState({ items });
  };

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
              items.map((item, index) =>
              <li key={item.orderIndex} onDragOver={() => this.onDragOver(index)}>
                <div
                  className="drag"
                  draggable
                  onDragStart={e => this.onDragStart(e, index)}
                  onDragEnd={() => {this.onDragEnd()}}
                >
                  <FontAwesomeIcon icon={faBars} />
                </div>
                <span className="item-content">{item.orderIndex} - {item.name} - £{item.price}</span>
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
