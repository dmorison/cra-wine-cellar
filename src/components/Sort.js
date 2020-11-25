import React, { useState } from "react";
import { Col } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Sort = (props) => {
  let { filters } = props;

  const sortBy = (event) => {
		console.log(event);
		let updatedWines = props.wines;

		updatedWines.map((item) => {
			return item.Price = parseFloat(item.Price);
		});

		switch (event) {
			case "price_low-high":
				updatedWines = [...updatedWines].sort((a, b) => {
					return a.Price - b.Price;
				});
				break;
			case "price_high-low":
				updatedWines = [...updatedWines].sort((a, b) => {
					return b.Price - a.Price;
				});
				break;
		}
    
    filters.Sort = event;
    props.setFilters(filters);
		props.setWines(updatedWines);
	}

  return (
    <Col xs={12} md={2}>
			<DropdownButton 
				title={filters.Sort === "none" ? 
								"Sort by" : 
									filters.Sort === "price_high-low" ?
									"Price high-low" : "Price low-high"
							} 
				onSelect={sortBy}
			>
				<Dropdown.Item eventKey={"price_high-low"}>
					Price high-low
				</Dropdown.Item>
				<Dropdown.Item eventKey={"price_low-high"}>
					Price low-high
				</Dropdown.Item>              
			</DropdownButton>
    </Col>
  );
}

export default Sort;