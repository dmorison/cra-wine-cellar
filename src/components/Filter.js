import React, { useState } from "react";

import { details } from '../utils/utils';

const Filter = (props) => {
  let { filters } = props;
  
  const filterWines = (event, filterBy) => {
    let updatedWines = props.initWines;
    
    if (filterBy === "Search") {
      updatedWines = updatedWines.filter(item => {
        return item.Name.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1;
      });
      filters.Search = event.target.value;
    } else if (filters.Search !== "") {
      updatedWines = updatedWines.filter(item => {
        return item.Name.toLowerCase().search(
          filters.Search.toLowerCase()) !== -1;
      });
    }

    let thisFilter = filters.filterTypes;
		if (filterBy !== "Stock" && filterBy !== "Search") {
			thisFilter[filterBy] = event.target.value;
		}
    
		for (const prop in thisFilter) {
			if (thisFilter[prop] === "") {
				console.log(`${prop} is not set`);
			} else {
				updatedWines = updatedWines.filter(item => {
					return item[prop].toLowerCase() === thisFilter[prop];
				});
			}
		}

    let stockFilter = filters.Stock;
		if (filterBy === "Stock") {
      stockFilter = Number(event.target.value);
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
      <div>
        <input type="text" placeholder="Search" onChange={(e) => filterWines(e, "Search")} />
      </div>
      <div>
        <select onChange={(e) => filterWines(e, "Country")}>
          <option value={""}>Select Country</option>
          {
            details.Country.map((country, i) => {
              return (
                <option key={i} value={country.toLowerCase()}>{country}</option>
              )
            })
          }
        </select>
      </div>
      <div>
        <select onChange={(e) => filterWines(e, "Variety")}>
          <option value={""}>Select Variety</option>
          {
            details.Variety.map((variety, i) => {
              return (
                <option key={i} value={variety.toLowerCase()}>{variety}</option>
              )
            })
          }
        </select>
      </div>
      <div>			
        <label><input type="radio" name="stock" value={1} onChange={(e) => filterWines(e, "Stock")} checked={filters.Stock === 1} />In stock</label>
        <label><input type="radio" name="stock" value={0} onChange={(e) => filterWines(e, "Stock")} checked={filters.Stock === 0} />Out of stock</label>
        <label><input type="radio" name="stock" value={-1} onChange={(e) => filterWines(e, "Stock")} checked={filters.Stock === -1} />Show all</label>
      </div>      
    </>
  );
};

export default Filter;