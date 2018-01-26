import { FETCH_INVENTORY } from '../actions/index';

export default function(state = [], action) {
	
	switch(action.type){
		case FETCH_INVENTORY:
		console.log(action.payload.data);
			return [ action.payload.data];
	}
	return state;
}