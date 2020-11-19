import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

const Detail = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.wine.Name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>{props.wine.Country}</span><br />
        <span>{props.wine.Region}</span><br />
        <span>{props.wine.Variety}</span><br />
        <span>{props.wine.Purchased}</span><br />
        <span>{props.wine.Price}</span><br />
        <span>{props.wine.Stock}</span><br />
      </Modal.Body>
    </Modal>
  );
};

export default Detail;