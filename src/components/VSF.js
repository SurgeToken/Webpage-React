import React from 'react';
import Form from 'react-bootstrap/Form'
import TokenStats from './TokenStats';
import { FaRegCopy } from "react-icons/fa";
import Image from 'react-bootstrap/Image';
import Web3 from 'web3';
import {useState, useEffect} from 'react';

const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const farms = [
	{
			'address': '0x579aaF9882A1941885fADa7A6243cEACf3037659',
			'name': 'BNB-xUSD FARM',
			'symbol': 'BNBxUSD'
		}
	]



	export default function VSF() {

		const [selectedFarm, setSelectedFarm] = useState(farms[0]);

		const farmChange = (e) => {
			let farmSymbol = e.target.value;
			const farmData = farms.filter(farm => farm.symbol === farmSymbol)[0];
			console.log({farmSymbol, farmData, setSelectedFarm, selectedFarm})

			setSelectedFarm(farmData);
		}

			
		return (
			<div className="widget spacerToken tokenList2">
			<Form.Select className="farmSelect" onChange={(ev) => farmChange(ev)}>
				{farms.map((farm) => {
					return (
						<option value={farm.symbol}>{farm.name}</option>
					);

				})}
			</Form.Select>
			

			<div className="tokenData">
				<div className="cValueSpacer">
					
				</div>
			
				<table className="table table-borderless statsTable" cellSpacing="0">
					<tbody>
						<tr>
							<td colSpan="5" className="coloredTD">
								<div className="tdLabel">Contract Address</div>
								<div className="tdData"><FaRegCopy onClick={() => {navigator.clipboard.writeText(selectedFarm.address)}}/></div>
							</td>
						</tr>
						<tr>
							<td className="">
								<div className="cAddressData">{selectedFarm.address}</div>
							</td>
						</tr>
					</tbody>
				</table>
	   
			</div>

		</div>
			)
	
		
	}