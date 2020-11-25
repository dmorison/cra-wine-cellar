import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { details } from '../utils/utils';

const Filter = (props) => {
  let { filters } = props;
  
  const filterWines = (e, filterBy) => {
    console.log(e);
    console.log(filterBy);
    let updatedWines = props.initWines;
    
    if (filterBy === "Search") {
      updatedWines = updatedWines.filter(item => {
        return item.Name.toLowerCase().search(
          e.toLowerCase()) !== -1;
      });
      filters.Search = e;
    } else if (filters.Search !== "") {
      updatedWines = updatedWines.filter(item => {
        return item.Name.toLowerCase().search(
          filters.Search.toLowerCase()) !== -1;
      });
    }

    let thisFilter = filters.filterTypes;
		if (filterBy !== "Stock" && filterBy !== "Search") {
			thisFilter[filterBy] = e;
		}
    
		for (const prop in thisFilter) {
			if (thisFilter[prop] === "") {
				console.log(`${prop} is not set`);
			} else if (thisFilter[prop] === "other") {
        updatedWines = updatedWines.filter(item => {
					return details[filterBy].indexOf(item[prop]) < 0;
				});
      } else {
				updatedWines = updatedWines.filter(item => {
					return item[prop].toLowerCase() === thisFilter[prop];
				});
			}
		}

    let stockFilter = filters.Stock;
		if (filterBy === "Stock") {
      stockFilter = Number(e);
      filters.Stock = stockFilter;
    }

    if (stockFilter > 0) {
      updatedWines = updatedWines.filter(item => {
        return Number(item.Stock) > 0;
      });
    } else if (stockFilter === 0) {
      updatedWines = updatedWines.filter(item => {
        return Number(item.Stock) === 0;
      });
    }		

    filters.filterTypes = thisFilter;
    filters.Sort = "none";
		props.setFilters(filters);
    props.setWines(updatedWines);
	}

  return (
    <>
      <Col xs={12} md={2}>
        <input 
          className="search-input" 
          type="text" 
          placeholder="Search" 
          onChange={(e) => filterWines(e, "Search")} 
        />
      </Col>
      <Col xs={12} md={8}>
        <Row>
          <Col xs={12} md={3}>
            <DropdownButton 
              title={filters.filterTypes.Country === "" ? "Country" : filters.filterTypes.Country} 
              onSelect={(e) => filterWines(e, "Country")}
            >
              <Dropdown.Item eventKey={""}>Clear filter</Dropdown.Item>
              {
                details.Country.map((country, i) => {
                  return (
                  <Dropdown.Item 
                    key={i} 
                    eventKey={country.toLowerCase()}
                  >
                      {country}
                  </Dropdown.Item>
                  )
                })
              }
            </DropdownButton>
          </Col>
          <Col xs={12} md={3}>
            <DropdownButton 
              title={filters.filterTypes.Variety === "" ? "Variety" : filters.filterTypes.Variety} 
              onSelect={(e) => filterWines(e, "Variety")}
            >
              <Dropdown.Item eventKey={""}>Clear filter</Dropdown.Item>
              {
                details.Variety.map((variety, i) => {
                  return (
                  <Dropdown.Item 
                    key={i} 
                    eventKey={variety.toLowerCase()}
                  >
                      {variety}
                  </Dropdown.Item>
                  )
                })
              }
            </DropdownButton>            
          </Col>
          <Col xs={12} md={3}>
            <DropdownButton 
              title={filters.filterTypes.Purchased === "" ? "Purchased" : filters.filterTypes.Purchased} 
              onSelect={(e) => filterWines(e, "Purchased")}
            >
              <Dropdown.Item eventKey={""}>Clear filter</Dropdown.Item>
              {
                details.Purchased.map((purchased, i) => {
                  return (
                  <Dropdown.Item 
                    key={i} 
                    eventKey={purchased.toLowerCase()}
                  >
                      {purchased}
                  </Dropdown.Item>
                  )
                })
              }
            </DropdownButton>            
          </Col>
          <Col xs={12} md={3}>
            <DropdownButton 
              title={filters.Stock === -1 ? 
                      "Stock" : 
                        filters.Stock === 1 ?
                        "In stock" : "Out of stock"
                    } 
              onSelect={(e) => filterWines(e, "Stock")}
            >
              <Dropdown.Item eventKey={1}>
                In stock
              </Dropdown.Item>
              <Dropdown.Item eventKey={0}>
                Out of stock
              </Dropdown.Item>
              <Dropdown.Item eventKey={-1}>
                Show all
              </Dropdown.Item>              
            </DropdownButton>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Filter;