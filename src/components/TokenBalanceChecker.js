import React from 'react';
import { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import SurgeTokens from './json/surge_tokens.json';
import Web3 from 'web3';

const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const tokens = SurgeTokens

class TokenBalanceChecker extends Component {
	constructor() {
		super();
		this.state = {
			token_balance_error_message: "",
			selectedTokenByUser: false,
			selectedToken: "",
			token_balance_response: []
		};
	}

	tokenChange = (e) => {
		this.setState({token_balance_response: []});
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

	lookupBalances = (ev) => {
		console.log(this.state.selectedToken);
		// Reset states
		this.setState({token_balance_error_message: ""});
		
		let promises = [];
		let wallet_response = {};
		let tokens_to_check = [];
		let formated_wallet_address = "";

		if (this.state.selectedToken == "all") {
			let wallet_address = document.getElementById('token_balance_wallet_address');
			// Check to see if the supplied address is valid/invalid
			try {
				formated_wallet_address = web3.utils.toChecksumAddress(wallet_address.value);
			} catch(err) {
				this.setState({token_balance_error_message: "Supplied address is invalid"});
				return;
			}
			tokens_to_check = tokens;
		} else {
			for (const token in tokens) {
				if (this.state.selectedToken == tokens[token]['symbol']) {
					tokens_to_check.push(tokens[token]);
				}
			}
		}

		for (const token in tokens_to_check) {
			wallet_response[tokens_to_check[token]["name"]] = {
				'symbol': tokens_to_check[token]['symbol']
			};
			
			let contract = new web3.eth.Contract(tokens_to_check[token]["abi"], tokens_to_check[token]["address"]);

			// Lookup / Set token balance depending on selected token
			if (this.state.selectedToken == "all") {
				let balance_of = new Promise (function (resolve, reject) {
					contract.methods.balanceOf(formated_wallet_address).call({}, function(error, result) {
						if (error) {
							reject(error);
						} else {
							resolve(result);
						}
					});
				});
				promises.push(balance_of);
				balance_of.then(
					data => {
						wallet_response[tokens_to_check[token]["name"]]['balance'] = data;
					}
				);
			} else {
				let token_balance = document.getElementById('token_balance');
				// @todo do some number validation here
				wallet_response[tokens_to_check[token]["name"]]['balance'] = token_balance.value;
			}

			// get price of underlying asset here
			
			// the price of one surge token in underlying asset


			// const priceInUnderlyingRaw = await instance.contract.calculatePrice();
			// console.log("PRICE IN UNDERLYING RAW: ", priceInUnderlyingRaw);
			// const priceInUnderlying = ethers.utils.formatUnits(priceInUnderlyingRaw, instance.underlyingDecimals);
			// console.log("PRICE IN UNDERLYING: ", priceInUnderlying);

			// // get value in BNB per instance
			// const valueInBNBRaw = await pancakeRouter.getAmountsOut(
			// // priceInUnderlyingRaw,
			// ethers.utils.formatUnits(priceInUnderlyingRaw, 'wei'),
			// [instance.underlyingContract.address, BNB.address]
			// );
			// console.log("VALUE IN BNB RAW: ", valueInBNBRaw);
			// const valueInBNB = ethers.utils.formatUnits(valueInBNBRaw[1], 'ether')
			// console.log("VALUE IN BNB: ", valueInBNB);

			// // get value in BUSD per instance
			// const valueInBUSDRaw = await pancakeRouter.getAmountsOut(
			// // valueInBNBRaw[1],
			// ethers.utils.formatUnits(valueInBNBRaw[1], 'wei'),
			// [BNB.address, BUSD.address]
			// );
			// const valueInBUSD = ethers.utils.formatUnits(valueInBUSDRaw[1], 'ether')
			// console.log("VALUE IN BUSD: ", valueInBUSD);
		}

		Promise.allSettled(promises).then(
			result => {
				let output = [];
				for (const k in wallet_response) {
					output.push({
						'name' : k, 
						'symbol' : wallet_response[k]['symbol'],
						'balance' : wallet_response[k]['balance']
					});
				}

				this.setState({token_balance_response: output});
				console.log(this.state.token_balance_response);

				//Current Balance:
				//Current Value (USD):
			}
		);
	}

	render() {
		return (
			<div className="widget spacerToken tokenList2">
			{/* <Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner> */}
				<div id="token_balance_checker_error_container">
					<p id="token_balance_checker_error_message">{this.state.token_balance_error_message}</p>
				</div>
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

						<div onClick={(ev) => this.lookupBalances(ev)}>Check</div>
						<div>
							{this.state.token_balance_response.map((token) => {
								return (
									<div>Current Balance: {token.balance} {token.symbol}</div>
								);
							})}
						</div>
					</div>
				}

				{!this.renderCheckTokenBalancesView() ? "" :
					<div id="capture_token_balance_container">
						<input 
							id="token_balance"
							type="text"/>

						<div onClick={(ev) => this.lookupBalances(ev)}>Calculate</div>
						<div>
							{this.state.token_balance_response.map((token) => {
								return (
									<div>Current Balance: {token.balance} {token.symbol}</div>
								);
							})}
						</div>
					</div>
				}
			</div>
		)
	}
}

export default TokenBalanceChecker;