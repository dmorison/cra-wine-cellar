import React from "react";
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import "./Detail.css";

const Detail = (props) => {
  const rated = props.wine.Rating === "" ? false : true;

  const renderStarRating = () => {
    const stars = Number(props.wine.Rating);
    
    const halfStar = (stars % 1 === 0) ? false : true;
    const fullStars = halfStar ? stars - 0.5 : stars;
    const emptyStars = 5 - Math.round(stars);

    const starArr = [];
    for (let i = 0; i < fullStars; i++) {
      starArr.push(1);
    }
    if (halfStar) {
      starArr.push(5);
    }
    for (let j = 0; j < emptyStars; j++) {
      starArr.push(0);
    }

    return (
      <>
        {starArr.map((star, key) => {
          return <i className={star === 1 ? 
                                "fa fa-star" :
                                  star === 5 ?
                                  "fa fa-star-half-o" :
                                    star === 0 ?
                                    "fa fa-star-o" :
                                      null} 
                    aria-hidden="true"
                    key={key}></i>
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
          <Col>
            <p>
              {rated ? renderStarRating() : <span>Not yet rated</span>}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <img 
              src={props.wine.Image ? `/images/${props.wine.Image}.jpg` : "/images/wine-bottle-1.png"} 
              className={props.wine.Image ? "wine-thumbnail" : "wine-thumbnail placeholder"}
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
            <p className="large-text p-no-margin"><strong>Stock: {props.wine.Stock}</strong></p>
            <p className="p-no-margin">Market price: {props.wine.Price}</p>
          </Col>
        </Row>
        <Table size="sm">
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