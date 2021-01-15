import React from "react";
import { Col } from 'react-bootstrap';
import "./WineCard.css";

const WineCard = (props) => {
  const { wine } = props;

  return (
    <Col xs={12} md={4} lg={3}>
      <a onClick={(e) => props.handleShow(e, wine)} className="wine-card">
        <span className="wine-name"><strong>{wine.Name}</strong></span>
        <div className="wine-info">
          <span>{wine.Region}</span><br />
          <span>{wine.Country}</span><br />
          <span>{wine.Variety}</span>
        </div>
      </a>
    </Col>
  );
};

export default WineCard;