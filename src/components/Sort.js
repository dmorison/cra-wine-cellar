import React, { useState } from "react";

const Sort = (props) => {
  let { filters } = props;

  const sortBy = (event) => {
    let updatedWines = props.wines;

		updatedWines.map((item) => {
			return item.Price = parseFloat(item.Price);
		});

		switch (event.target.value) {
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
    
    filters.Sort = event.target.value;
    props.setFilters(filters);
		props.setWines(updatedWines);
	}

  return (
    <div>
      <select onChange={sortBy} value={filters.Sort}>
        <option value="none">Select Order</option>
        <option value="price_high-low">Price high-low</option>
        <option value="price_low-high">Price low-high</option>
      </select>
    </div>
  );
}

export default Sort;