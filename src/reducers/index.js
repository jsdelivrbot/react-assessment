import { combineReducers } from 'redux';
import InventoryReducer from './reducer_inventory';

const rootReducer = combineReducers({
  inventory: InventoryReducer
});

export default rootReducer;
