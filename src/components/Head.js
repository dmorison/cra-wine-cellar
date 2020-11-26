import React from "react";
import { Container } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import "./Head.css";

import { details } from '../utils/utils';

const Head = (props) => {
  let { filters } = props;
  
  const filterWines = (e, filterBy) => {
    let updatedWines = props.initWines;
    
    if (filterBy === "Search") {
      updatedWines = updatedWines.filter(item => {
        return item.Name.toLowerCase().search(
          e.target.value.toLowerCase()) !== -1;
      });
      filters.Search = e.target.value;
    } else if (filters.Search !== "") {
      updatedWines = updatedWines.filter(item => {
        return item.Name.toLowerCase().search(
          filters.Search.toLowerCase()) !== -1;
      });
    }

    let thisFilter = filters.filterTypes;
		if (filterBy !== "Stock" && filterBy !== "Search" && filterBy !== "Sort") {
			thisFilter[filterBy] = e;
		}
    
		for (const prop in thisFilter) {
			if (thisFilter[prop] === "") {
				// console.log(`${prop} is not set`);
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

    if (filterBy === "Sort" || filters.Sort !== "none") {
      updatedWines.map((item) => {
        return item.Price = parseFloat(item.Price);
      });

      const sortVariable = filterBy === "Sort" ? e : filters.Sort;
      
      switch (sortVariable) {
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
      filters.Sort = sortVariable;
    }

    filters.filterTypes = thisFilter;
		props.setFilters(filters);
    props.setWines(updatedWines);
	}

  return (
    <Navbar sticky="top" expand="md" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand>Wine Cellar</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <NavDropdown
            title={filters.filterTypes.Country === "" ? "Country" : filters.filterTypes.Country} 
            onSelect={(e) => filterWines(e, "Country")}
          >
            <NavDropdown.Item eventKey={""}>Clear filter</NavDropdown.Item>
            <NavDropdown.Divider />
            {
              details.Country.map((country, i) => {
                return (
                <NavDropdown.Item 
                  key={i} 
                  eventKey={country.toLowerCase()}
                >
                  {country}
                </NavDropdown.Item>
                )
              })
            }
          </NavDropdown>

          <NavDropdown 
            title={filters.filterTypes.Variety === "" ? "Variety" : filters.filterTypes.Variety} 
            onSelect={(e) => filterWines(e, "Variety")}
          >
            <NavDropdown.Item eventKey={""}>Clear filter</NavDropdown.Item>
            <NavDropdown.Divider />
            {
              details.Variety.map((variety, i) => {
                return (
                <NavDropdown.Item 
                  key={i} 
                  eventKey={variety.toLowerCase()}
                >
                  {variety}
                </NavDropdown.Item>
                )
              })
            }
          </NavDropdown>

          <NavDropdown 
            title={filters.filterTypes.Purchased === "" ? "Purchased" : filters.filterTypes.Purchased} 
            onSelect={(e) => filterWines(e, "Purchased")}
          >
            <NavDropdown.Item eventKey={""}>Clear filter</NavDropdown.Item>
            <NavDropdown.Divider />
            {
              details.Purchased.map((purchased, i) => {
                return (
                <NavDropdown.Item 
                  key={i} 
                  eventKey={purchased.toLowerCase()}
                >
                    {purchased}
                </NavDropdown.Item>
                )
              })
            }
          </NavDropdown>

          <NavDropdown 
            title={filters.Stock === -1 ? 
                    "Stock" : 
                      filters.Stock === 1 ?
                      "In stock" : "Out of stock"
                  } 
            onSelect={(e) => filterWines(e, "Stock")}
          >
            <NavDropdown.Item eventKey={1}>
              In stock
            </NavDropdown.Item>
            <NavDropdown.Item eventKey={0}>
              Out of stock
            </NavDropdown.Item>
            <NavDropdown.Item eventKey={-1}>
              Show all
            </NavDropdown.Item>              
          </NavDropdown>
          
          <NavDropdown 
            title={filters.Sort === "none" ? 
                    "Sort by" : 
                      filters.Sort === "price_high-low" ?
                      "Price high-low" : "Price low-high"
                  } 
            onSelect={(e) => filterWines(e, "Sort")}
          >
            <NavDropdown.Item eventKey={"price_high-low"}>
              Price high-low
            </NavDropdown.Item>
            <NavDropdown.Item eventKey={"price_low-high"}>
              Price low-high
            </NavDropdown.Item>              
          </NavDropdown>
          
          <Form inline>
            <Form.Control
              className="search-input" 
              type="text" 
              placeholder="Search Name" 
              onChange={(e) => filterWines(e, "Search")}
            />
          </Form>
        </Nav>
      </Navbar.Collapse>
      </Container>
		</Navbar>
  );
};

export default Head;