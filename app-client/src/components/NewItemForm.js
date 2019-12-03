import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {
    Row,
    Col,
    Form,
    FormGroup,
    Button
  } from 'reactstrap';

class NewItemForm extends Component {

  async handleAddItem(e) {
    // Prevent page reloading
    e.preventDefault();

    this.props.handleAddItem(this.textInput.value, this.price.value);

    // Reset the input boxes values
    this.textInput.value = ""
    this.price.value = ""
  }

  render() {
    return (
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
          <Button onClick={this.handleAddItem.bind(this)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col>
      </Row>
    );
  }
}

export default NewItemForm;
