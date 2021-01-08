import React from "react";
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import "./Detail.css";

const Detail = (props) => {
  const stars = Number(props.wine.Rating);

  const renderStarRating = () => {
    const starArr = [];
    console.log(stars);
    const halfStar = (stars % 1 === 0) ? false : true;
    console.log(halfStar);
    const fullStars = halfStar ? stars - 0.5 : stars;
    console.log(fullStars);
    const emptyStars = 5 - Math.round(stars);
    console.log(emptyStars);

    return (
      <>
        {fullStars.map(() => {
          return <i class="fa fa-star" aria-hidden="true"></i>
        })}
        {halfStar && (
          <i class="fa fa-star-half-o" aria-hidden="true"></i>
        )}
        {emptyStars.map(() => {
          return <i class="fa fa-star-o" aria-hidden="true"></i>
        })}
      </>
    );
  }

  return props.show && (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><span>{props.wine.Name} - {props.wine.Year}</span></Modal.Title>
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
        <Row>
          <Col>
            {renderStarRating()}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
          <Table size="sm">
            <tbody>            
              <tr>
                <td>Rating (5)</td>
                  <td>{props.wine.Rating}</td>
                </tr>
              <tr>
                <td>Stock</td>
                <td>{props.wine.Stock}</td>
              </tr>            
            </tbody>
          </Table>
          </Col>
        </Row>
        
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Purchased</th>
              <th>Year</th>
              <th>Price (£)</th>
            </tr>
          </thead>
          <tbody>
            {props.wine.purchaseHistory.map((purchase, key) => {
              return (
                <tr key={key}>
                  <td>{purchase.Date}</td>
                  <td>{purchase.Purchased}</td>
                  <td>{purchase.Year}</td>
                  <td>{purchase.Price}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default Detail;