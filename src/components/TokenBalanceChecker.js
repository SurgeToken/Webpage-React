import React from 'react';
import ReactDOM from 'react-dom'
import { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import SurgeTokens from './json/surge_tokens.json';
import Web3 from 'web3';

const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const tokens = SurgeTokens

class TokenBalanceChecker extends Component {
	constructor() {
		super();
		// Loop through cookies and read them into state
		document.cookie = "username=John Doe";
		console.log(document.cookie);
		this.state = {
			error_message_class: "",
			token_balance_error_message: "",
			token_balance_container_class: "",
			check_balance_button_spinner_class: "hide",
			check_balance_button_text_class: "",
			selectedTokenByUser: false,
			selectedToken: "",
			token_balance_response: [],
			check_balance_button_text: "",
			capture_token_balance_container_input_id: "",
			capture_token_balance_container_input_type: "",
			capture_token_balance_input_placeholder: ""
		};
	}

	tokenChange = (e) => {
		this.setState({
			token_balance_response: [],
			error_message_class: "",
			token_balance_container_class: "show"
		});

		let tokenSymbol = e.target.value;
		let button_text = "";
		let balance_container_input_id = "";
		let balance_container_input_type = "";
		let input_placeholder = "";
		this.setState({selectedTokenByUser: true});
		if (tokenSymbol === "0") {
			this.setState({selectedTokenByUser: false});
			return
		} else {
			if (tokenSymbol === "all") {
				button_text = "Check";
				balance_container_input_id = "token_balance_wallet_address";
				balance_container_input_type = "text";
				input_placeholder = "Enter BEP-20 Public Wallet Address"
			} else {
				button_text = "Calculate";
				balance_container_input_id = "token_balance";
				balance_container_input_type = "number";
				input_placeholder = "Enter "+tokenSymbol+" Amount";
			}

			this.setState({
				check_balance_button_text: button_text,
				capture_token_balance_container_input_id: balance_container_input_id,
				capture_token_balance_container_input_type: balance_container_input_type,
				selectedToken: tokenSymbol,
				capture_token_balance_input_placeholder: input_placeholder
			});
		}
	}

	renderCheckTokenBalancesView = () => {
		if (this.state.selectedTokenByUser && this.state.selectedToken !== "0") {
			return true;
		}
		
		return false;
	}

	lookupBalances = (ev) => {
		// Reset states
		this.setState({
			error_message_class: "",
			check_balance_button_spinner_class: "",
			check_balance_button_text_class: "hide"
		});
		
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
				this.setState({
					token_balance_error_message: "Supplied address is invalid",
					error_message_class: "show",
					check_balance_button_spinner_class: "hide",
					check_balance_button_text_class: ""
				});
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
				'symbol': tokens_to_check[token]['symbol'],
				'decimals': tokens_to_check[token]['decimals'],
				'decimal_display': tokens_to_check[token]['decimal_display']
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
				if (token_balance.value <= 0) {
					this.setState({token_balance_error_message: "Token Balance Must Be Greater Than 0"});
					return;
				}
				wallet_response[tokens_to_check[token]["name"]]['balance'] = token_balance.value;
			}

			let get_token_price = new Promise (function (resolve, reject) {
				contract.methods.calculatePrice().call({}, function(error, result) {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
			});
			promises.push(get_token_price);
			get_token_price.then(
				data => {
					wallet_response[tokens_to_check[token]["name"]]['token_price'] = web3.utils.fromWei(data, tokens_to_check[token]["wei_unit"]);
				}
			);

			// get price of underlying asset here
			let base_url = "https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses={contract_address}&vs_currencies=usd";
			if (tokens_to_check[token]['external_lookup']) {
 				let lookup_url = base_url.replace("{contract_address}", tokens_to_check[token]["uassetaddress"]);
 				let request = fetch(lookup_url).then(response => response.text()).then(
 					data => {
 						let data_obj = JSON.parse(data);
						wallet_response[tokens_to_check[token]["name"]]['usd_price'] = data_obj[tokens_to_check[token]["uassetaddress"]]['usd'];
 					}
 				);

				promises.push(request);
			} else {
				if (tokens_to_check[token]['symbol'] === "sUSD" || tokens_to_check[token]['symbol'] === "xUSD") {
					wallet_response[tokens_to_check[token]["name"]]['usd_price'] = 1;
				}
			}
		}

		Promise.allSettled(promises).then(
			result => {
				let output = [];
				for (const k in wallet_response) {
					if (wallet_response[k]['balance'] > 0) {
						let balance = (wallet_response[k]['balance'] / 10**wallet_response[k]['decimals']);
						let current_value = (balance * parseFloat(wallet_response[k]['token_price']) * parseFloat(wallet_response[k]['usd_price'])).toFixed(2);
						output.push({
							'name' : k, 
							'symbol' : wallet_response[k]['symbol'],
							'balance' : balance.toLocaleString(),
							'current_value' : current_value.toLocaleString(),
							'token_price': wallet_response[k]['token_price']
						});
					}
				}

				this.setState({
					token_balance_response: output,
					check_balance_button_spinner_class: "hide",
					check_balance_button_text_class: ""
				});

				//Current Balance:
				//Current Value (USD):
			}
		);
	}

	render() {
		return (
			<div className="widget spacerToken tokenList2">
				<div id="token_balance_checker_error_container" class={this.state.error_message_class}>
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

				<div class={this.state.token_balance_container_class} id="token_balance_container">
					{!this.renderCheckTokenBalancesView() ? "" :
						<div id="capture_token_balance_container">
							<input 
								class="capture_token_balance_input" 
								id={this.state.capture_token_balance_container_input_id} 
								type={this.state.capture_token_balance_container_input_type}
								placeholder={this.state.capture_token_balance_input_placeholder}
							/>
							
							<div id="capture_token_balance_button" onClick={(ev) => this.lookupBalances(ev)}>
								<Spinner size="sm" id="balance_check_button_spinner" className={this.state.check_balance_button_spinner_class} animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
								<span id="check_balance_button_text" class={this.state.check_balance_button_text_class}>
									{this.state.check_balance_button_text}
								</span>
							</div>
						</div>
					}

					{this.state.token_balance_response == [] ? "" :
						<div id="token_balance_display_container">
							{this.state.token_balance_response.map((token) => {
								return (

									<div class="token_balance_container">
										<div class="token_balance_token">
											{token.name}
										</div>
										<div class="token_balance_header">
											Current Balance
										</div>
										<div class="token_balance_amount">
											{token.balance}
										</div>
									</div>
								);
							})}
						</div>
					}
				</div>
			</div>
		)
	}
}

export default TokenBalanceChecker;