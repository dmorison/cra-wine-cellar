import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

import { details } from './utils';
// import { getData } from './API';
import { mockData } from './mockData';

const filterParams = {
	Search: 0,
	Type: "",
	Country: "",
	Variety: "",
	Purchased: ""
};

const App = () => {
	const [initWines, setInitWines] = useState([]);
	const [wines, setWines] = useState([]);
	const [filters, setFilters] = useState(filterParams);
	const [stockFilter, setStockFilter] = useState("3");

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
		if (event.target.value.length > filterParams.Search) {
			updatedWines = wines;
		} else {
			updatedWines = initWines;
		}

		updatedWines = updatedWines.filter(item => {
			return item.Name.toLowerCase().search(
				event.target.value.toLowerCase()) !== -1;
		});
		
		filterParams.Search = event.target.value.length;
		setFilters(filterParams);
		setWines(updatedWines);
	}

	const filterWines = (event, filterBy) => {
		console.log(filters);
		console.log(filterBy);
		console.log(event.target.value);

		let updatedWines = [];
		if (filters[filterBy] === "") {
			updatedWines = wines;			
		} else {
			updatedWines = initWines;
		}

		updatedWines = updatedWines.filter(item => {
			return item[filterBy].toLowerCase() === event.target.value;
		});

		filterParams[filterBy] = event.target.value;
		setFilters(filterParams);
		setWines(updatedWines);
	}

	const filterByStock = (event) => {
		console.log(event.target.value);
		console.log(stockFilter);

		let updatedWines = initWines;
		for (const prop in filters) {
			if (prop !== "Search" && filters[prop] !== "") {
				console.log(`${prop}: ${filters[prop]}`);
				updatedWines = wines;
			}
		}

		if (event.target.value === "1") {
			console.log("filter by in stock");
			updatedWines = updatedWines.filter(item => {
				return parseInt(item.Stock) > 0;
			});
		} else if (event.target.value === "2") {
			console.log("filter by out of stock");
			updatedWines = updatedWines.filter(item => {
				return parseInt(item.Stock) === 0;
			});
		} else {
			console.log("remove");
		}

		setWines(updatedWines);
		// let newStockFilterValue = !stockFilter;
		// console.log(newStockFilterValue);
		setStockFilter(event.target.value);
	}

	const orderBy = (event) => {
		console.log(event.target.value);
		let updatedWines = wines;
		console.log(typeof(updatedWines[0].Price));
		updatedWines.map((item) => {
			return item.Price = parseFloat(item.Price);
		});
		console.log(typeof(updatedWines[0].Price));
		console.log(updatedWines);
		updatedWines = [...updatedWines].sort((a, b) => {
			return a.Price - b.Price;
		});
		// console.log(updatedWines);
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
						<option value={0}>Select Country</option>
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
						<option value={0}>Select Variety</option>
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
					<label><input type="radio" name="stock" value="1" onChange={filterByStock} checked={stockFilter === "1"} />In stock</label>
					<label><input type="radio" name="stock" value="2" onChange={filterByStock} checked={stockFilter === "2"} />Out of stock</label>
					<label><input type="radio" name="stock" value="3" onChange={filterByStock} checked={stockFilter === "3"} />Show all</label>
				</div>
				<div>
					<select onChange={orderBy}>
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
