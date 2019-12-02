import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import {
    Row,
    Col,
    Card,
    CardBody,
    Form,
    FormGroup,
    Button
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
    e.dataTransfer.setDragImage(e.target.parentNode.parentNode.parentNode, 20, 20);
  };

  async onDragEnd() {
    let items = this.state.items;

    Object.keys(this.state.items).forEach(index => {
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

  async deleteItem(itemToRemove) {
    await fetch('/items/' + itemToRemove.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let items = this.state.items;

    let filteredItems = items.filter((item) => {
      return item !== itemToRemove;
    });

    this.setState({ items: filteredItems });
  }

  async addItem(e) {
    e.preventDefault();

    let newItem = {
      name: this.textInput.value,
      price: this.price.value,
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

    let items = this.state.items;
    items.push(newItemFromServer);

    this.setState({ items })

    this.textInput.value = ""
    this.price.value = ""
  }

  async handleItemCheck(e, item, index) {
    let newItem = item;
    newItem.complete = !item.complete;

    await fetch('/items/' + item.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });

    let updatedItems = this.state.items;
    updatedItems[index] = newItem;

    this.setState({ updatedItems });

    // TODO: move ticked items to bottom of list
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
          <Row>
            <Col xs="7">
              <Form>
                <FormGroup>
                  <input type="text" className="form-control" name="item" placeholder="Enter new item" ref={(input) => this.textInput = input}></input>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="3">
              <Form>
                <FormGroup>
                  <input type="number" className="form-control" name="price" placeholder="Price" ref={(price) => this.price = price}></input>
                </FormGroup>
              </Form>
            </Col>
            <Col xs="2">
              <Button onClick={this.addItem.bind(this)}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Col>
          </Row>
            {
              items.map((item, index) =>
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
                      <Col onClick={() => this.deleteItem(item)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>)
            }
        </Col>
        <Col></Col>
      </Row>
    );
  }
}

export default Header;
