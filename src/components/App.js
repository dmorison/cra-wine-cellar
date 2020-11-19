import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

import Filter from "./Filter";
import Sort from "./Sort";
import Detail from "./Detail";
// import { getData } from '../utils/API';
import { mockData } from '../utils/mockData';

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
	const [wineDetail, setWineDetail] = useState({});
	const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e, wine) => {
		setWineDetail(wine);
		setShow(true);
	};

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

  return (
		<div className="App">
			<header className="App-header">
				<h1>Wine Cellar</h1>
			</header>
			<Container>
				<Row>
					<Filter
						initWines={initWines}
						setWines={setWines}
						filters={filters}
						setFilters={setFilters}
					/>
				</Row>
				<Row>
					<Sort
						wines={wines}
						setWines={setWines}
						filters={filters}
						setFilters={setFilters}
					/>
				</Row>
				<Row>
					{wines.map((wine, i) => {
						return (
							<Col xs={12} md={4} lg={3} key={i}>
								<a onClick={(e) => handleShow(e, wine)} className="wine-card">
									<span className="wineName"><strong>{wine.Name}</strong></span>
									<span>{wine.Country}</span><br />
									<span>{wine.Region}</span><br />
									<span>{wine.Variety}</span>
									{/* {Object.keys(wine).map((key) => {
										return (
											<p key={key}><span>{key}:</span> <span>{wine[key]}</span></p>
										)
									})} */}
								</a>
							</Col>
						)
					})}
					<Detail show={show} handleClose={handleClose} wine={wineDetail} />
				</Row>
				{/* <button onClick={() => getWines()}>UPDATE WINES</button> */}
			</Container>
		</div>
	)
};

export default App;
