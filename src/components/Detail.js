import React from "react";
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'

const Detail = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.wine.Name} - {props.wine.Year}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="small-text"><i>{props.wine.Type}</i></span><br />
        <p className="large-text p-no-margin">{props.wine.Region}, {props.wine.Country}</p>
        <p className="medium-text">{props.wine.Variety === "Blend" ? props.wine.Grapes : props.wine.Variety}</p>
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