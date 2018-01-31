import axios from 'axios';

const ROOT_URL = 'https://api.myjson.com/bins/1enitl';

export const FETCH_INVENTORY = 'FETCH_INVENTORY';

export function fetchInventory() {
	const url = ROOT_URL;
	const request = axios.get(url);

	return {
		type: FETCH_INVENTORY,
		payload: request
	}
}