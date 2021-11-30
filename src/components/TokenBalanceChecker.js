import React from 'react';
import ReactDOM from 'react-dom'
import { Component } from 'react';
import Cookies from 'js-cookie'
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import {getSurgeTokensData} from './SurgeAssetData.js';
import Web3 from 'web3';

const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const tokens = getSurgeTokensData();

class TokenBalanceChecker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error_message_class: "",
			token_balance_error_message: "",
			token_balance_container_class: "",
			check_balance_button_spinner_class: "hide",
			check_balance_button_text_class: "",
			selectedTokenByUser: false,
			selectedToken: "",
			token_balance_response: false,
			check_balance_button_text: "",
			capture_token_balance_container_input_id: "",
			capture_token_balance_container_input_type: "",
			capture_token_balance_input_placeholder: "",
			capture_token_balance_input_value: ""
		};
	}

	tokenChange = (e) => {
		this.setState({
			token_balance_response: false,
			error_message_class: "",
			token_balance_container_class: "show",
			capture_token_balance_input_value: "",
			selectedTokenByUser: true
		});

		let tokenSymbol = e.target.value;
		let button_text = "";
		let balance_container_input_id = "";
		let balance_container_input_type = "";
		let input_placeholder = "";
		let token_balance_input_value = "";

		if (tokenSymbol === "0") {
			this.setState({
				selectedTokenByUser: false,
				token_balance_container_class: ""
			});
			return
		} else {
			if (tokenSymbol === "all") {
				button_text = "Check";
				balance_container_input_id = "token_balance_wallet_address";
				balance_container_input_type = "text";
				input_placeholder = "Enter BEP-20 Public Wallet Address";
				let public_wallet_address = Cookies.get('public_wallet_address');
				if (public_wallet_address != undefined) {
					token_balance_input_value = public_wallet_address;
				}
			} else {
				button_text = "Calculate";
				balance_container_input_id = "token_balance";
				balance_container_input_type = "number";
				input_placeholder = "Enter "+tokenSymbol+" Amount";
				let selected_token_amount = Cookies.get(tokenSymbol+'_token_amount');
				if (selected_token_amount != undefined) {
					token_balance_input_value = selected_token_amount;
				}
			}

			this.setState({
				check_balance_button_text: button_text,
				capture_token_balance_container_input_id: balance_container_input_id,
				capture_token_balance_container_input_type: balance_container_input_type,
				selectedToken: tokenSymbol,
				capture_token_balance_input_placeholder: input_placeholder,
				capture_token_balance_input_value: token_balance_input_value
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
					token_balance_error_message: "Supplied wallet address is invalid",
					error_message_class: "show",
					check_balance_button_spinner_class: "hide",
					check_balance_button_text_class: ""
				});
				return;
			}
			tokens_to_check = tokens;

			// Set Public Wallet Address Cookie
			Cookies.set('public_wallet_address', formated_wallet_address, {expires: 30, path: '/' });
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
				'underlying_asset': tokens_to_check[token]['uasset'],
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
				let token_balance_element = document.getElementById('token_balance');
				let token_balance = parseInt(token_balance_element.value);
				
				if (this.state.selectedToken == 'xUSD') {
					token_balance = web3.utils.toWei(String(token_balance), tokens_to_check[token]["wei_unit"]);
					token_balance = parseInt(token_balance);
				}

				if (token_balance <= 0 || isNaN(token_balance)) {
					this.setState({
						error_message_class: "show",
						token_balance_error_message: "Token Balance Must Be Greater Than 0",
						check_balance_button_spinner_class: "hide",
						check_balance_button_text_class: "show"
					});
					return;
				}

				Cookies.set(this.state.selectedToken+'_token_amount', token_balance_element.value, {expires: 30, path: '/' });
				wallet_response[tokens_to_check[token]["name"]]['balance'] = token_balance;
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
						let current_ua_amount = (balance * parseFloat(wallet_response[k]['token_price']));
						let current_value = (balance * parseFloat(wallet_response[k]['token_price']) * parseFloat(wallet_response[k]['usd_price']));
						output.push({
							'name' : k,
							'underlying_asset' : wallet_response[k]['underlying_asset'],
							'symbol' : wallet_response[k]['symbol'],
							'balance' : balance.toLocaleString(undefined, {maximumFractionDigits: 5}),
							'underlying_asset_amount' : current_ua_amount.toLocaleString(undefined, {maximumFractionDigits: 5}), 
							'current_value' : current_value.toLocaleString(undefined, {style: "currency", currency: "USD"}),
							'token_price': wallet_response[k]['token_price']
						});
					}
				}

				this.setState({
					token_balance_response: output,
					check_balance_button_spinner_class: "hide",
					check_balance_button_text_class: ""
				});
			}
		);
	}

	handleUserInput = (e) => {
		this.setState({
			capture_token_balance_input_value: e.target.value
		});
	};

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
								value={this.state.capture_token_balance_input_value}
								type={this.state.capture_token_balance_container_input_type}
								placeholder={this.state.capture_token_balance_input_placeholder}
								onChange={this.handleUserInput}
								min="1"
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

					{!this.state.token_balance_response ? "" :
						<div id="token_balance_display_container">
							{this.state.token_balance_response.map((token) => {
								return (
									<div class="token_balance_wrapper">
										<fieldset class="token_balance_wrapper_fieldset">
											<legend align="center">{token.name}</legend>
											<div class="token_balance_amount_wrapper">
												<div class="token_balance_header">
													Current Balance
												</div>
												<div class="token_balance_amount">
													{token.balance}
												</div>
											</div>
											<div class="token_balance_value_ua_wrapper">
												<div class="token_value_ua_header">
													Current Amount ({token.underlying_asset})
												</div>
												<div class="token_amount_ua">
													{token.underlying_asset_amount}
												</div>
											</div>
											<div class="token_balance_value_usd_wrapper">
												<div class="token_value_usd_header">
													Current Value (USD)
												</div>
												<div class="token_value_usd_amount">
													{token.current_value}
												</div>
											</div>
											<div class="clear"></div>
										</fieldset>
									</div>
								);
							})}
							<p id="token_balance_disclaimer">*Data provided by BSC and CoinGecko API's</p>
						</div>
					}
				</div>
			</div>
		)
	}
}

export default TokenBalanceChecker;