import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

import { details } from '../utils/utils';
// import { getData } from './API';
import { mockData } from '../utils/mockData';

const filterParams = {
	Search: 0,
	Stock: -1,
	filterTypes: {
		Type: "",
		Country: "",
		Variety: "",
		Purchased: ""
	}
};

const App = () => {
	const [initWines, setInitWines] = useState([]);
	const [wines, setWines] = useState([]);
	const [filters, setFilters] = useState(filterParams);
	const [orderByValue, setOrderByValue] = useState("none");

  useEffect(() => {
    getWines();
	}, []);
	
	const formatData = (data) => {
		const keys = data[0];
		const values = data.slice(1);
		const objects = values.map(array => {
			const object = {};
			keys.forEach((key, i) => object[key] = array[i]);
			return object;
		});
		return objects;
	};

	const getWines = async () => {
		let data = mockData;
		console.log(data);
		setInitWines(data);
		setWines(data);
		// try {
		// 	const { data } = await getData();
		// 	console.log(data.values);
		// 	let responseData = formatData(data.values);
		// 	console.log(responseData);
		// 	setInitWines(responseData);
		// 	setWines(responseData);
		// } catch (err) {
		// 	console.log(err);
		// }
	};

	const searchWines = (event) => {
		let updatedWines = [];
		if (event.target.value.length > filters.Search) {
			updatedWines = wines;
		} else {
			updatedWines = initWines;
		}

		updatedWines = updatedWines.filter(item => {
			return item.Name.toLowerCase().search(
				event.target.value.toLowerCase()) !== -1;
		});
		
		filters.Search = event.target.value.length;
		setFilters(filters);
		setWines(updatedWines);
	}

	const filterWines = (event, filterBy) => {
		let thisFilter = filters.filterTypes;

		if (filterBy !== "Stock") {
			thisFilter[filterBy] = event.target.value;
		}

		let updatedWines = initWines;
		for (const prop in thisFilter) {
			if (thisFilter[prop] === "") {
				console.log(`${prop} is not set`);
			} else {
				updatedWines = updatedWines.filter(item => {
					return item[prop].toLowerCase() === thisFilter[prop];
				});
			}
		}

		if (filterBy === "Stock") {
			let stockFilter = Number(event.target.value);

			if (stockFilter > 0) {
				updatedWines = updatedWines.filter(item => {
					return Number(item.Stock) > 0;
				});
			} else if (stockFilter === 0) {
				updatedWines = updatedWines.filter(item => {
					return Number(item.Stock) === 0;
				});
			}

			filters.Stock = stockFilter;
		}

		filters.filterTypes = thisFilter;
		setFilters(filters);
		setOrderByValue("none");
		setWines(updatedWines);
	}

	const orderBy = (event) => {
		let updatedWines = wines;

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
		
		setOrderByValue(event.target.value);
		setWines(updatedWines);
	}

  return (
		<div className="App">
			<header className="App-header">
				<h1>Wine Cellar</h1>
			</header>
			<div className="wrapper">
				<div>
					<input type="text" placeholder="Search" onChange={searchWines} />
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
				<div>
					<select onChange={orderBy} value={orderByValue}>
						<option value="none">Select Order</option>
						<option value="price_high-low">Price high-low</option>
						<option value="price_low-high">Price low-high</option>
					</select>
				</div>
				{wines.map((wine, i) => {
					return (
						<div className="card" key={i}>
							{Object.keys(wine).map((key) => {
								return (
									<p key={key}><span>{key}:</span> <span>{wine[key]}</span></p>
								)
							})}
						</div>
					)
				})}
				{/* <button onClick={() => getWines()}>UPDATE WINES</button> */}
			</div>
		</div>
	)
};

export default App;
