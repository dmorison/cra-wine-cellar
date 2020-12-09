import React from "react";
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import "./Detail.css";

const Detail = (props) => {
  return props.show && (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.wine.Name} - {props.wine.Year}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={3}>
            <img 
              src={props.wine.Image ? `/images/${props.wine.Image}.jpg` : "/images/placeholder.png"} 
              className="wine-thumbnail"
              alt="wine thumbnail" 
            />
          </Col>
          <Col xs={9}>
            <span className="small-text"><i><strong>{props.wine.Type}</strong></i></span><br />
            <p className="large-text p-no-margin">
              <strong>
                {props.wine.Region},<br />
                {props.wine.Country}
              </strong>
            </p>
            <p className="medium-text">
              <strong>
                {props.wine.Variety === "Blend" ? props.wine.Grapes : props.wine.Variety}
              </strong>
            </p>
          </Col>
        </Row>
        <Table bordered size="sm">
          <tbody>
            <tr>
              <td>Purchased</td>
              <td>{props.wine.Purchased}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{props.wine.Price}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{props.wine.Date}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>{props.wine.Stock}</td>
            </tr>
            <tr>
              <td>Rating (5)</td>
              <td>{props.wine.Rating}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default Detail;