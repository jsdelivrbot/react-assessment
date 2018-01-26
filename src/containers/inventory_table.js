import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchInventory } from '../actions/index';

class InventoryTable extends Component {

	componentDidMount(){
		this.props.fetchInventory();
	}
	renderTable(data) {
		data = data[0];
		const date = "2018-01-01";
		const ternminalName = data.name;

		//CALC CURRENT INVENTORY
		//calculates the current inventory of the provided node by adding the current inventory, subtracting
		//the volume out for the the provided date and adding the volume for the provided date
		function calcCurrentInventory(data, date){
			const todaysInventory = data.forecasts.find(elem => elem.date===date);
			return data.current_inventory - todaysInventory.volume_out + todaysInventory.volume_in;
		}

		//CALC DAYS SUPPLY TO MIN INVENTORY
		//given the data and a date, return the difference in days between today and when inventory reaches
		//below minimum by inventory-forcasted volume out + forcasted volume in. if minimum is never reached
		//output >30 
		function calcDaysSupplyToMinInventory(data){
			let initDif = data.current_inventory-data.minimum_inventory;
			const days = data.forecasts
				.map(({volume_in, volume_out})=>initDif+=(parseInt(volume_in)-parseInt(volume_out)))
				.findIndex(inv => inv<=0) + 1;
			return days>30||days===0?">30":days;
		 }

		 //CALC FORECAST VOLUME IN
		 //the sum of all volume in
		 function calcForecastVolumeIn(data){
			return data.forecasts.map(elem=>parseInt(elem.volume_in)).reduce((acc, curr)=>acc+curr);
		 }

		 //CALC FORECAST EOM CLOSING INVENTORY
		 //todays inventory - sum of all volume out + sum of all volume in for month
		 function calcForecastEOMClosingInventory(data){
			let currentInv = data.current_inventory;
			return data.forecasts.map(({volume_in, volume_out})=>currentInv+=(parseInt(volume_in)-parseInt(volume_out)))[data.forecasts.length-1];
		}

		return (
			<tbody key={data.name}>
				<tr className="tableTitleBox">
					<th className="terminalNameRow">
						<span className="terminalName">{ternminalName}</span> Terminal
					</th>
				</tr>
				<tr className="columnHeaders">
					<th>Current Inventory</th>
					<th>Days Supply to Min Inventory</th>
					<th>Forecast Volume In</th>
					<th>Forecast EOM Closing Inventory</th>
				</tr>
				<tr className="tableValues">
					<td>{calcCurrentInventory(data,date)}</td>
					<td>{calcDaysSupplyToMinInventory(data)}</td>
					<td>{calcForecastVolumeIn(data)}</td>
					<td>{calcForecastEOMClosingInventory(data)}</td>
				</tr>
			</tbody>
			
		);
	}

	render() {
		return (
			<table className="table table-hover">
					{this.props.inventory.map(this.renderTable)}
			</table>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchInventory }, dispatch);
}

function mapStateToProps({ inventory }) {
	return { inventory }; 
}

export default connect(mapStateToProps,mapDispatchToProps)(InventoryTable);