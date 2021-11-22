import React from 'react';
import Form from 'react-bootstrap/Form'
import TokenStats from './TokenStats';
import { FaRegCopy, FaCheck } from "react-icons/fa";
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
		const [selectedFarmByUSer, setSelectedFarmByUser] = useState(false);

		const farmChange = (e) => {
			setSelectedFarmByUser(true);
			let farmSymbol = e.target.value;
			if(farmSymbol === "0"){
				setSelectedFarmByUser(false); return
			}
			const farmData = farms.filter(farm => farm.symbol === farmSymbol)[0];

			setSelectedFarm(farmData);
		}

		const addressCopy = function(address) {

			// Copy to clipboard
			navigator.clipboard.writeText(address);
	
			// "Copied" animation
			let icon1 = document.querySelector("#copy-icon-faddress");
			let icon2 = document.querySelector("#copy-icon-okay-faddress");
			icon1.classList.add("hidden");
			icon2.classList.remove("hidden"); 
			
			setTimeout(()=>{
				icon2.classList.add("hidden");
				icon1.classList.remove("hidden"); 
			}, 2000);
		}

			
		return (
			<div className="widget spacerToken tokenList2">
			<Form.Select className="farmSelect" onChange={(ev) => farmChange(ev)}>
				<option value ="0" defaultValue>Select a Farm</option>
				{farms.map((farm) => {
					return (
						<option key={farm.symbol} value={farm.symbol}>{farm.name}</option>
					);

				})}
			</Form.Select>
			
			{!selectedFarmByUSer?"":
			<div className="tokenData">
				<div className="cValueSpacer1">
					&nbsp;
				</div>
			
				<table className="table table-borderless farmStatsTable" cellSpacing="0">
					<tbody>
						<tr>
							<td colSpan="5" className="coloredTD">
								<div className="tdLabel">Contract Address</div>
								<div className="tdData"><FaRegCopy id="copy-icon-faddress" onClick={() => addressCopy(selectedFarm.address)}/>
                                    <FaCheck id="copy-icon-okay-faddress" className="hidden" />
									</div>
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
			}
		</div>
			)
	
		
	}