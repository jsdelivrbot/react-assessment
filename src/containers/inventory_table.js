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
			<div key={data.name} className="row">
				<div className="col-md-3"></div>
				<div className="col-md-6 overall">
					<div className="row terminalTitleBox">
						<div className="col-md-12 terminalName">{ternminalName} <span className="terminal">Terminal</span></div>
						
					</div>
					<div className="row tableData">
						<div className="col-md-3 divider tableCells firstCell">
							<div className="row tableHeaders">Current Inventory</div>
							<div className="row tableData">{calcCurrentInventory(data,date)}</div>
						</div>
						<div className="col-md-3 divider tableCells">
							<div className="row tableHeaders">Days Supply to Min <br/> Inventory</div>
							<div className="row tableData">{calcDaysSupplyToMinInventory(data)}</div>
						</div>
						<div className="col-md-3 divider tableCells">
							<div className="row tableHeaders">Forecast Volume In</div>
							<div className="row tableData">{calcForecastVolumeIn(data)}</div>
						</div>
						<div className="col-md-3 tableCells">
							<div className="row tableHeaders">Forecast EOM Closing <br/> Inventory</div>
							<div className="row tableData">{calcForecastEOMClosingInventory(data)}</div>
						</div>
					</div>
					<div className="row gray"></div>
				</div>
				<div className="col-md-3"></div>
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.props.inventory.map(this.renderTable)}
			</div>
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