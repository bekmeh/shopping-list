import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {
    Row,
    Col,
    Card,
    CardBody
  } from 'reactstrap';
import NewItemForm from './NewItemForm';

class Header extends Component {

  state = {
    isLoading: true,
    items: []
  };

  async componentDidMount() {
    // Fetch items from the server
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

    // Move dragged item's position/index in the item list
    items.splice(dragLocationIndex, 0, this.draggedItem);

    // Update items list
    this.setState({ items });
  };

  onDragStart = (e, index) => {
    // Set what data is being dragged
    this.draggedItem = this.state.items[index];
    this.startIndex = index;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode.parentNode.parentNode, 20, 20);
  };

  async onDragEnd() {
    // Update the items 'orderIndex' values to match their index in the array
    let items = this.state.items;

    Object.keys(this.state.items).forEach(index => {
      items[index].orderIndex = index;
    });

    // Send all updated items to the server
    await fetch('/items', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    });

    // Update the state
    this.setState({ items });
  };

  async handleDeleteItem(itemToRemove) {
    // Delete from the server
    await fetch('/items/' + itemToRemove.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Update the state
    let items = this.state.items;

    let filteredItems = items.filter((item) => {
      return item !== itemToRemove;
    });

    this.setState({ items: filteredItems });
  }

  async handleAddItem(textInput, price) {
    // Create item and post to server
    let newItem = {
      name: textInput,
      price: price,
      orderIndex: this.state.items.length + 1
    };

    const response = await fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });

    const newItemFromServer = await response.json();

    // Update the state
    let items = this.state.items;
    items.push(newItemFromServer);

    this.setState({ items })
  }

  async handleItemCheck(e, item, index) {
    // Set new 'complete' value
    let newItem = item;
    newItem.complete = !item.complete;

    // Update the item on server
    await fetch('/items/' + item.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });

    // Update the state
    let updatedItems = this.state.items;
    updatedItems[index] = newItem;

    this.setState({ updatedItems });
  }

  render() {
    const {items, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    return (
      <Row>
        <Col></Col>
        <Col xs="6">
          <NewItemForm handleAddItem={this.handleAddItem.bind(this)} />
            { items.map((item, index) =>
                <Card key={item.id} onDragOver={() => this.onDragOver(index)}>
                  <CardBody>
                    <Row>
                      <Col xs="1">
                        <div
                          className="drag"
                          draggable
                          onDragStart={e => this.onDragStart(e, index)}
                          onDragEnd={this.onDragEnd.bind(this)}
                        >
                        <FontAwesomeIcon icon={faBars} />
                        </div>
                      </Col>
                      <Col xs="2">
                        <input type="checkbox" checked={item.complete} onChange={e => { this.handleItemCheck(e, item, index) }} />
                      </Col>
                      <Col xs="5" className="text-left">
                        {item.name}
                      </Col>
                      <Col xs="2">
                          £{item.price}
                      </Col>
                      <Col onClick={() => this.handleDeleteItem(item)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
            )}
        </Col>
        <Col></Col>
      </Row>
    );
  }
}

export default Header;
