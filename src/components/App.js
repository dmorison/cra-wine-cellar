import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

import Filter from "./Filter";
import Sort from "./Sort";
import { getData } from '../utils/API';
// import { mockData } from '../utils/mockData';

const filterParams = {
	Search: "",
	Stock: -1,
	Sort: "none",
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
		// let data = mockData;
		// console.log(data);
		// setInitWines(data);
		// setWines(data);
		try {
			const { data } = await getData();
			console.log(data.values);
			let responseData = formatData(data.values);
			console.log(responseData);
			setInitWines(responseData);
			setWines(responseData);
		} catch (err) {
			console.log(err);
		}
	};

  return (
		<div className="App">
			<header className="App-header">
				<h1>Wine Cellar</h1>
			</header>
			<div className="wrapper">
				<div>
					<Filter
						initWines={initWines}
						setWines={setWines}
						filters={filters}
						setFilters={setFilters}
					/>
				</div>
				<div>
					<Sort
						wines={wines}
						setWines={setWines}
						filters={filters}
						setFilters={setFilters}
					/>
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
