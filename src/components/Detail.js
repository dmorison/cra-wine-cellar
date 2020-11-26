import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'

const Detail = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.wine.Name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered>
          <tbody>
            <tr>
              <td>Country</td>
              <td>{props.wine.Country}</td>
            </tr>
            <tr>
              <td>Region</td>
              <td>{props.wine.Region}</td>
            </tr>
            <tr>
              <td>Variety</td>
              <td>{props.wine.Variety}</td>
            </tr>
            <tr>
              <td>Purchased</td>
              <td>{props.wine.Purchased}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{props.wine.Price}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>{props.wine.Stock}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default Detail;