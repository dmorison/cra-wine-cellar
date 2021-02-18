import React from "react";
import { Col } from 'react-bootstrap';
import "./WineCard.css";

const WineCard = (props) => {
  const { wine } = props;

  const bgImgNum = Math.random();
  let bgImg = "barrel";
  if (bgImgNum < 0.333) {
    bgImg = "bottle";
  } else if (bgImgNum >= 0.666) {
    bgImg = "clock";
  }

  return (
    <Col xs={12} md={4} lg={3}>
      <a 
        className={`wine-card bgimg-${bgImg}`}
        onClick={(e) => props.handleShow(e, wine)}
      >
        <span className="wine-name"><strong>{wine.Name}</strong></span>
        <div className="wine-info">
          <span><strong>{wine.Variety}</strong></span><br />
          <span>{wine.Region}</span><br />
          <span>{wine.Country}</span>
        </div>
        <i className="fa fa-chevron-right"></i>
      </a>
    </Col>
  );
};

export default WineCard;