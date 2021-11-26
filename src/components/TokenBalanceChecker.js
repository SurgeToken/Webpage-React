import React from 'react';
import { Component } from 'react';
import Form from 'react-bootstrap/Form'
import SurgeTokens from './json/surge_tokens.json';
import Web3 from 'web3';

const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const tokens = SurgeTokens

class TokenBalanceChecker extends Component {
	constructor() {
		super();
		this.state = {
			selectedTokenByUser: false,
			selectedToken: ""
		};
	}

	tokenChange = (e) => {
		let tokenSymbol = e.target.value;
		this.setState({selectedTokenByUser: true});
		if (tokenSymbol === "0") {
			this.setState({selectedTokenByUser: false});
			return
		} else {
			this.setState({selectedToken: tokenSymbol});
		}
	}

	renderCheckAllBalancesView = () => {
		if (this.state.selectedTokenByUser && this.state.selectedToken == "all") {
			return true;
		}
		
		return false;
	}

	renderCheckTokenBalancesView = () => {
		if (this.state.selectedTokenByUser && this.state.selectedToken != "all") {
			return true;
		}
		
		return false;
	}

	lookupWalletBalances = (e) => {
		let promises = [];
		let wallet_response = {};
		//let wallet_address = document.getElementById('token_balance_wallet_address');
		let wallet_address = "0xAEF57C7b7De8887A97d4Fc50E5aBa573236F292d";
		let formated_wallet_address = web3.utils.toChecksumAddress(wallet_address);

		try {
			
		} catch(err) {
			console.log(err.message);
			return;
		}

		for (const token in tokens) {
			wallet_response[tokens[token]["name"]] = {};
			let contract = new web3.eth.Contract(tokens[token]["abi"], tokens[token]["address"]);

			let token_balance = contract.methods.balanceOf(formated_wallet_address).call().then(
				data => {
					wallet_response[tokens[token]["name"]]['balance'] = data;
				}
			);

			let base_url = "https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses={contract_address}&vs_currencies=usd";
			if (tokens[token]['external_lookup']) {
				let lookup_url = base_url.replace("{contract_address}", tokens[token]["uassetaddress"]);
				
				let request = fetch(lookup_url).then(response => response.text()).then(
					data => {
						
						let data_obj = JSON.parse(data);
						wallet_response[tokens[token]["name"]]['usd_price'] = data_obj[tokens[token]["uassetaddress"]]['usd'];
					}
				);

				promises.push(request);
			}
		}

		Promise.allSettled(promises)
			.then((result) => {
				console.log(wallet_response);
			});
	}

	render() {
		return (
			<div className="widget spacerToken tokenList2">
				<Form.Select className="tokenSelect" onChange={(ev) => this.tokenChange(ev)}>
					<option value="0" defaultValue>Select a Token</option>
					<option value="all" defaultValue>Check All Tokens</option>
					{tokens.map((token) => {
						return (
							<option key={token.symbol} value={token.symbol}>{token.name}</option>
						);
					})}
				</Form.Select>

				{!this.renderCheckAllBalancesView() ? "" :
					<div id="capture_wallet_address_container">
						<input 
							id="token_balance_wallet_address"
							type="text"/>

						<div onClick={(ev) => this.lookupWalletBalances(ev)}>Lookup wallet balance</div>
					</div>
				}

				{!this.renderCheckTokenBalancesView() ? "" :
					<div>
						I want to check a single token
					</div>
				}
			</div>
		)
	}
}

export default TokenBalanceChecker;