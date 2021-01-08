import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import './App.css';

import Head from "./Head";
import WineCard from "./WineCard";
import Detail from "./Detail";
// import { getData } from '../utils/API';
// import { formatData } from '../utils/formatData';
// import { mockData } from '../utils/mockData';
import testData from '../utils/testDataOne.json';
import testPurchaseData from '../utils/testPurchaseData.json';
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
	const [purchaseHistory, setPurchaseHistory] = useState([]);
	const [filters, setFilters] = useState(filterParams);
	const [wineDetail, setWineDetail] = useState({});
	const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e, wine) => {
		const winePurchseHistory = purchaseHistory.filter(item => {
			return item.Image === wine.Id;
		});
		wine.purchaseHistory = winePurchseHistory;
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

	const getWines = async () => {
		let data = testData;
		console.log(data);
		// data = JSON.parse(data);
		setInitWines(data);
		setWines(data);
		setPurchaseHistory(testPurchaseData);
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
