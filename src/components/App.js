import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

import Head from "./Head";
import WineCard from "./WineCard";
import Detail from "./Detail";
// import { getData } from '../utils/API';
import { mockData } from '../utils/mockData';
import { getCounts } from '../utils/counts';

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
	const [counts, setCounts] = useState(null);
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

	useEffect(() => {
		const countsObj = getCounts(wines);
		setCounts(countsObj);
	}, [wines]);
	
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
		// **********************************************
		// try {
		// 	const { data } = await getData();
		// 	console.log(data);
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
			<Head
				initWines={initWines}
				setWines={setWines}
				filters={filters}
				setFilters={setFilters}
				counts={counts}
			/>
			<Container>
				<Row>
					{wines.map((wine, i) => {
						return (
							<WineCard wine={wine} key={i} handleShow={handleShow} />
						)
					})}
					<Detail show={show} handleClose={handleClose} wine={wineDetail} />
				</Row>
			</Container>
		</div>
	)
};

export default App;
