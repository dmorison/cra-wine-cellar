import axios from "axios";
import { keys } from "./keys";

const getData = () => {
	const sheetId = keys.sheetId;
	const apiKey = keys.apiKey;
	const URLoneSheet = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
	const URLtwoSheets = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=Sheet1&ranges=Purchase_History&key=${apiKey}`;

	const options = {
		method: "GET",
		url: URLoneSheet
	};
	return axios(options);
};

export { getData };