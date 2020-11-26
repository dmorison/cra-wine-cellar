import axios from "axios";
import { keys } from "./keys";

const getData = () => {
	const sheetId = keys.sheetId;
	const apiKey = keys.apiKey;

	const options = {
		method: "GET",
		url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`
	};
	return axios(options);
};

export { getData };