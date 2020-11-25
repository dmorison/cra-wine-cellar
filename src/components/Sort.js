import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
    <Nav>
			<NavDropdown 
				title={filters.Sort === "none" ? 
								"Sort by" : 
									filters.Sort === "price_high-low" ?
									"Price high-low" : "Price low-high"
							} 
				onSelect={sortBy}
			>
				<NavDropdown.Item eventKey={"price_high-low"}>
					Price high-low
				</NavDropdown.Item>
				<NavDropdown.Item eventKey={"price_low-high"}>
					Price low-high
				</NavDropdown.Item>              
			</NavDropdown>
    </Nav>
  );
}

export default Sort;