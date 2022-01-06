import React from 'react';
import { Component } from 'react';
import Cookies from 'js-cookie'
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import * as SurgeAssets from './SurgeAssetData.js';
import Web3 from 'web3';

const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const farms = SurgeAssets.getSurgeFarmsData();

console.log(farms);

class FarmBalanceChecker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error_message_class: "",
			farm_balance_error_message: "",
			farm_balance_container_class: "",
			check_farm_balance_button_spinner_class: "hide",
			check_farm_balance_button_text_class: "",
			selectedFarmByUser: false,
			selectedFarm: "",
			farm_balance_response: false,
			check_farm_balance_button_text: "",
			capture_farm_balance_input_placeholder: "",
			capture_farm_balance_input_value: ""
		};
	}

	farmChange = (e) => {
		this.setState({
			farm_balance_response: false,
			error_message_class: "",
			farm_balance_container_class: "show",
			capture_farm_balance_input_value: "",
			selectedFarmByUser: true
		});

		let farmSymbol = e.target.value;
		let button_text = "";
		let input_placeholder = "";

		if (farmSymbol === "0") {
			this.setState({
				selectedFarmByUser: false,
				farm_balance_container_class: ""
			});
			return
		} else {
			button_text = "Check";
			input_placeholder = "Enter BEP-20 Public Wallet Address";
			let public_wallet_address = Cookies.get('public_wallet_address');
			let farm_balance_input_value = ""
			if (public_wallet_address !== undefined) {
				farm_balance_input_value = public_wallet_address;
			}

			this.setState({
				check_farm_balance_button_text: button_text,
				selectedFarm: farmSymbol,
				capture_farm_balance_input_placeholder: input_placeholder,
				capture_farm_balance_input_value: farm_balance_input_value
			});
		}
	}

	renderCheckFarmBalancesView = () => {
		if (this.state.selectedFarmByUser && this.state.selectedFarm !== "0") {
			return true;
		}
		
		return false;
	}

	lookupFarmBalances = (ev) => {
		// Reset states
		this.setState({
			error_message_class: "",
			check_farm_balance_button_spinner_class: "",
			check_farm_balance_button_text_class: "hide"
		});
		
		let promises = [];
		let wallet_response = {};
		let farms_to_check = [];
		let formated_wallet_address = "";
		let wallet_address = this.state.capture_farm_balance_input_value;

		// Check to see if the supplied address is valid/invalid
		try {
			formated_wallet_address = web3.utils.toChecksumAddress(wallet_address);
			if (formated_wallet_address.length === 0) {
				throw new Error("Supplied wallet address is invalid");
			}
		} catch(err) {
			this.setState({
				farm_balance_error_message: "Supplied wallet address is invalid",
				error_message_class: "show",
				check_farm_balance_button_spinner_class: "hide",
				check_farm_balance_button_text_class: ""
			});
			return;
		}

		if (this.state.selectedFarm === "all") {
			farms_to_check = farms;
		} else {
			for (const farm in farms) {
				if (this.state.selectedFarm === farms[farm]['symbol']) {
					farms_to_check.push(farms[farm]);
				}
			}
		}

		// Set Public Wallet Address Cookie
		Cookies.set('public_wallet_address', formated_wallet_address, {expires: 30, path: '/' });

		for (const farm in farms_to_check) {
			wallet_response[farms_to_check[farm]["name"]] = {
				'symbol': farms_to_check[farm]['symbol'],
				'paired_asset': farms_to_check[farm]['paired_asset'],
				'split_rewards': farms_to_check[farm]['split_rewards'],
				'is_paired_asset_surge_token': farms_to_check[farm]['is_paired_asset_surge_token']
			};
			
			let contract = new web3.eth.Contract(farms_to_check[farm]["abi"], farms_to_check[farm]["address"]);
			let lp_contaract = new web3.eth.Contract(farms_to_check[farm]["lp_abi"], farms_to_check[farm]["lp_address"]);
			
			// Get farm token balance
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
					wallet_response[farms_to_check[farm]["name"]]['farm_tokens'] = web3.utils.fromWei(data, farms_to_check[farm]["wei_unit"]);
				}
			);

			// Get farm redeemable value balance
			let redeemable_value = new Promise (function (resolve, reject) {
				contract.methods.getRedeemableValue(formated_wallet_address).call({}, function(error, result) {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
			});
			promises.push(redeemable_value);
			redeemable_value.then(
				data => {
					wallet_response[farms_to_check[farm]["name"]]['xusd_value'] = web3.utils.fromWei(data[0], farms_to_check[farm]["wei_unit"]);
					if (farms_to_check[farm]["is_paired_asset_surge_token"]) {
						wallet_response[farms_to_check[farm]["name"]]['paired_asset_value'] = data[1];
					} else {
						wallet_response[farms_to_check[farm]["name"]]['paired_asset_value'] = web3.utils.fromWei(data[1], farms_to_check[farm]["paired_asset_wei_unit"]);
					}
				}
			);

			// Get farm time until unlock
			let time_until_unlock = new Promise (function (resolve, reject) {
				contract.methods.getTimeUntilUnlock(formated_wallet_address).call({}, function(error, result) {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
			});
			promises.push(time_until_unlock);
			time_until_unlock.then(
				data => {
					let formated_time_until_unlock = (data*3)/60/60/24
					wallet_response[farms_to_check[farm]["name"]]['time_until_unlock'] = formated_time_until_unlock;
				}
			);

			// Get farm pending rewards
			let pending_rewards = new Promise (function (resolve, reject) {
				contract.methods.pendingRewards(formated_wallet_address).call({}, function(error, result) {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
			});
			promises.push(pending_rewards);
			pending_rewards.then(
				data => {
					if (!farms_to_check[farm]["split_rewards"]) {
						wallet_response[farms_to_check[farm]["name"]]['pending_rewards_xusd'] = web3.utils.fromWei(data, farms_to_check[farm]["wei_unit"]);
					} else {
						wallet_response[farms_to_check[farm]["name"]]['pending_rewards_xusd'] = web3.utils.fromWei(data[0], farms_to_check[farm]["wei_unit"]);
						if (farms_to_check[farm]["is_paired_asset_surge_token"]) {
							wallet_response[farms_to_check[farm]["name"]]['pending_rewards_paired_asset'] = data[1];
						} else {
							wallet_response[farms_to_check[farm]["name"]]['pending_rewards_paired_asset'] = web3.utils.fromWei(data[1], farms_to_check[farm]["paired_asset_wei_unit"]);
						}
					}
				}
			);

			// Get farm total rewards claimed
			let total_rewards_claimed = new Promise (function (resolve, reject) {
				contract.methods.totalRewardsClaimedForUser(formated_wallet_address).call({}, function(error, result) {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
			});
			promises.push(total_rewards_claimed);
			total_rewards_claimed.then(
				data => {
					console.log()
					if (!farms_to_check[farm]["split_rewards"]) {
						wallet_response[farms_to_check[farm]["name"]]['total_rewards_claimed_xusd'] = web3.utils.fromWei(data, farms_to_check[farm]["wei_unit"]);
					} else {
						wallet_response[farms_to_check[farm]["name"]]['total_rewards_claimed_xusd'] = web3.utils.fromWei(data[0], farms_to_check[farm]["wei_unit"]);
						if (farms_to_check[farm]["is_paired_asset_surge_token"]) {
							wallet_response[farms_to_check[farm]["name"]]['total_rewards_claimed_paired_asset'] = data[1];
						} else {
							wallet_response[farms_to_check[farm]["name"]]['total_rewards_claimed_paired_asset'] = web3.utils.fromWei(data[1], farms_to_check[farm]["paired_asset_wei_unit"]);
						}
					}
				}
			);

			// get xUSD contract price
			let xusd_token_data = SurgeAssets.getSurgeTokenData('xUSD');
			let xusd_contract = new web3.eth.Contract(xusd_token_data['abi'], xusd_token_data['address']);
			let current_xusd_price = new Promise (function (resolve, reject) {
				xusd_contract.methods.calculatePrice().call({}, function(error, result) {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
			});
			promises.push(current_xusd_price);
			current_xusd_price.then(
				data => {
					wallet_response[farms_to_check[farm]["name"]]['xusd_contract_price'] = web3.utils.fromWei(data, xusd_token_data["wei_unit"]);
				}
			);

			// get paired asset prices
			let base_url = "https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses={paired_asset_bsc_address}&vs_currencies=usd";
			if (!farms_to_check[farm]["is_paired_asset_surge_token"]) {
				base_url = base_url.replace('{paired_asset_bsc_address}', farms_to_check[farm]['paired_asset_token_address']);
				let request = fetch(base_url).then(response => response.text()).then(
					data => {
						let data_obj = JSON.parse(data);
						wallet_response[farms_to_check[farm]["name"]]['paired_asset_price'] = data_obj[farms_to_check[farm]["paired_asset_token_address"]]['usd'];
					}
				);
				promises.push(request);
			} else {
				let paired_surge_token_data = SurgeAssets.getSurgeTokenData(farms_to_check[farm]['surge_token']);

				base_url = base_url.replace('{paired_asset_bsc_address}', paired_surge_token_data['uassetaddress']);
				let request = fetch(base_url).then(response => response.text()).then(
					data => {
						let data_obj = JSON.parse(data);
						wallet_response[farms_to_check[farm]["name"]]['paired_asset_price'] = data_obj[paired_surge_token_data['uassetaddress']]['usd'];
					}
				);

				promises.push(request);

				let surge_contract = new web3.eth.Contract(paired_surge_token_data["abi"], paired_surge_token_data["address"]);

				let surge_token_price_call = new Promise (function (resolve, reject) {
					surge_contract.methods.calculatePrice().call({}, function(error, result) {
						if (error) {
							reject(error);
						} else {
							resolve(result);
						}
					});
				});
				promises.push(surge_token_price_call);
				surge_token_price_call.then(
					data => {
						wallet_response[farms_to_check[farm]["name"]]['surge_token_price'] = web3.utils.fromWei(data, paired_surge_token_data['wei_unit'])
					}
				);
			}

			// Get farm token total supply
			let farm_token_total_supply = new Promise (function (resolve, reject) {
				contract.methods.totalSupply().call({}, function(error, result) {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
			});
			promises.push(farm_token_total_supply);
			farm_token_total_supply.then(
				data => {
					console.log(data);
					wallet_response[farms_to_check[farm]["name"]]['farm_token_total_supply'] = parseFloat(web3.utils.fromWei(data, 'ether'));
				}
			);

			// Get lp token total supply
			let lp_token_total_supply = new Promise (function (resolve, reject) {
				lp_contaract.methods.totalSupply().call({}, function(error, result) {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
			});
			promises.push(lp_token_total_supply);
			lp_token_total_supply.then(
				data => {
					wallet_response[farms_to_check[farm]["name"]]['lp_token_total_supply'] = parseFloat(web3.utils.fromWei(data, 'ether'));
				}
			);
		}

		Promise.allSettled(promises).then(
			result => {
				let output = [];
				for (const k in wallet_response) {
					if (wallet_response[k]['farm_tokens'] > 0) {
						let farm_lp_balance_xusd = parseFloat(wallet_response[k]['xusd_value']) * (wallet_response[k]['lp_token_total_supply'] / wallet_response[k]['farm_token_total_supply']);
						let farm_lp_xusd_value = farm_lp_balance_xusd * parseFloat(wallet_response[k]['xusd_contract_price']);

						let farm_lp_balance_paired_asset = parseFloat(wallet_response[k]['paired_asset_value']) * (wallet_response[k]['lp_token_total_supply'] / wallet_response[k]['farm_token_total_supply']);
						let farm_lp_paired_asset_value = 0;
						if (!wallet_response[k]["is_paired_asset_surge_token"]) {
							farm_lp_paired_asset_value = farm_lp_balance_paired_asset * parseFloat(wallet_response[k]['paired_asset_price']);
						} else {
							farm_lp_paired_asset_value = farm_lp_balance_paired_asset * parseFloat(wallet_response[k]['surge_token_price']) * parseFloat(wallet_response[k]['paired_asset_price']);
						}

						let total_lp_farm_value = farm_lp_xusd_value + farm_lp_paired_asset_value;

						let pending_rewards_xusd = parseFloat(wallet_response[k]['pending_rewards_xusd']);
						let pending_rewards_xusd_usd = pending_rewards_xusd * parseFloat(wallet_response[k]['xusd_contract_price']);

						let pending_rewards_paired_asset = 0;
						let pending_rewards_paired_asset_usd = 0;
						if (wallet_response[k]["is_paired_asset_surge_token"]) {
							pending_rewards_paired_asset = parseFloat(wallet_response[k]['pending_rewards_paired_asset']);
							pending_rewards_paired_asset_usd = pending_rewards_paired_asset * parseFloat(wallet_response[k]['surge_token_price']) * parseFloat(wallet_response[k]['paired_asset_price']);
						}


						let rewards_view = "";
						if (wallet_response[k]['split_rewards']) {
							rewards_view = this.buildSplitRewardsView(
								pending_rewards_xusd,
								pending_rewards_xusd_usd,
								pending_rewards_paired_asset,
								pending_rewards_paired_asset_usd,
								wallet_response[k]['paired_asset'],
								wallet_response[k]['total_rewards_claimed_xusd'],
								wallet_response[k]['total_rewards_claimed_paired_asset']
							)
						} else {
							rewards_view = this.buildRewardsView(
								pending_rewards_xusd,
								pending_rewards_xusd_usd,
								wallet_response[k]['total_rewards_claimed_xusd']
							)
						}

						output.push({
							'name' : k,
							'symbol' : wallet_response[k]['symbol'],
							'paired_asset': wallet_response[k]['paired_asset'],
							'split_rewards': wallet_response[k]['split_rewards'],
							'farm_tokens' : parseFloat(wallet_response[k]['farm_tokens']).toFixed(5),
							'farm_lp_balance_xusd': farm_lp_balance_xusd.toLocaleString(undefined, {maximumFractionDigits: 5}),
							'farm_lp_balance_paired_asset': farm_lp_balance_paired_asset.toLocaleString(undefined, {maximumFractionDigits: 5}),
							'farm_lp_value_usd': total_lp_farm_value.toLocaleString(undefined, {style: "currency", currency: "USD"}),
							'time_until_unlock': Math.round(wallet_response[k]['time_until_unlock']),
							'rewards_view': rewards_view,
							'pending_rewards_xusd': pending_rewards_xusd.toFixed(5),
							'pending_rewards_paired_asset': pending_rewards_paired_asset,
							'pending_rewards_usd': pending_rewards_xusd_usd.toLocaleString(undefined, {style: "currency", currency: "USD"}),
							'total_rewards_claimed': parseFloat(wallet_response[k]['total_rewards_claimed_xusd']).toFixed(5)
						});
					}
				}

				this.setState({
					farm_balance_response: output,
					check_farm_balance_button_spinner_class: "hide",
					check_farm_balance_button_text_class: ""
				});
			}
		);
	}

	buildSplitRewardsView = (
		pending_rewards_xusd, 
		pending_rewards_xusd_usd, 
		pending_rewards_paired_asset, 
		pending_rewards_paired_asset_usd, 
		paired_asset,
		total_rewards_claimed_xusd,
		total_rewards_claimed_paired_asset) => {

		return (
			<div>
				<div class="farm_balance_wrapper_left">
					<div class="fieldset_header">
						Pending Rewards (xUSD)
					</div>
					<div class="text-center">
						{pending_rewards_xusd.toLocaleString(undefined, {maximumFractionDigits: 5})}
					</div>
				</div>
				<div class="farm_balance_wrapper_right">
					<div class="fieldset_header">
						Pending Rewards ({paired_asset})
					</div>
					<div class="text-center">
						{pending_rewards_paired_asset.toLocaleString(undefined, {maximumFractionDigits: 5})}
					</div>
				</div>
				<div class="clear"></div>
				<div class="farm_balance_spacer"></div>

				<div class="farm_balance_amount_wrapper">
					<div class="fieldset_header">
						Pending Rewards (USD)
					</div>
					<div class="text-center">
						{(pending_rewards_xusd_usd + pending_rewards_paired_asset_usd).toLocaleString(undefined, {style: "currency", currency: "USD"})}
					</div>
				</div>
				<div class="farm_balance_spacer"></div>

				<div class="farm_balance_wrapper_left">
					<div class="fieldset_header">
						Total Claimed (xUSD)
					</div>
					<div class="text-center">
						{parseFloat(total_rewards_claimed_xusd).toLocaleString(undefined, {maximumFractionDigits: 5})}
					</div>
				</div>
				<div class="farm_balance_wrapper_right">
					<div class="fieldset_header">
						Total Claimed ({paired_asset})
					</div>
					<div class="text-center">
						{parseFloat(total_rewards_claimed_paired_asset).toLocaleString(undefined, {maximumFractionDigits: 5})}
					</div>
				</div>
				<div class="clear"></div>
			</div>
		)
	}

	buildRewardsView = (pending_rewards_xusd, pending_rewards_xusd_usd, total_rewards_claimed_xusd) => {
		return (
			<div>
				<div class="farm_balance_wrapper_left">
					<div class="fieldset_header">
						Pending Rewards (xUSD)
					</div>
					<div class="text-center">
						{pending_rewards_xusd.toLocaleString(undefined, {maximumFractionDigits: 5})}
					</div>
				</div>
				<div class="farm_balance_wrapper_right">
					<div class="fieldset_header">
						Pending Rewards (USD)
					</div>
					<div class="text-center">
						{pending_rewards_xusd_usd.toLocaleString(undefined, {maximumFractionDigits: 5})}
					</div>
				</div>
				<div class="clear"></div>
				<div class="farm_balance_spacer"></div>
				<div class="farm_balance_amount_wrapper">
					<div class="fieldset_header">
						Total Claimed (xUSD)
					</div>
					<div class="text-center">
						{parseFloat(total_rewards_claimed_xusd).toLocaleString(undefined, {maximumFractionDigits: 5})}
					</div>
				</div>
			</div>
		)
	}

	handleUserInput = (e) => {
		this.setState({
			capture_farm_balance_input_value: e.target.value
		});
	};

	render() {
		return (
			<div className="widget spacerToken tokenList2">
				<div id="farm_balance_checker_error_container" class={this.state.error_message_class}>
					<p id="farm_balance_checker_error_message">{this.state.farm_balance_error_message}</p>
				</div>
				<Form.Select className="farmSelect" onChange={(ev) => this.farmChange(ev)}>
					<option value="0" defaultValue>Select a Farm</option>
					{farms.map((farm) => {
						return (
							<option key={farm.symbol} value={farm.symbol}>{farm.name}</option>
						);
					})}
				</Form.Select>

				<div class={this.state.farm_balance_container_class} id="farm_balance_container">
					{!this.renderCheckFarmBalancesView() ? "" :
						<div id="capture_farm_balance_container">
							<input
								class="capture_farm_balance_input" 
								id="capture_farm_wallet_address"
								value={this.state.capture_farm_balance_input_value}
								type="text"
								placeholder={this.state.capture_farm_balance_input_placeholder}
								onChange={this.handleUserInput}
							/>
							
							<div id="capture_farm_balance_button" onClick={(ev) => this.lookupFarmBalances(ev)}>
								<Spinner size="sm" id="balance_check_button_spinner" className={this.state.check_farm_balance_button_spinner_class} animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
								<span id="check_farm_balance_button_text" class={this.state.check_farm_balance_button_text_class}>
									{this.state.check_farm_balance_button_text}
								</span>
							</div>
						</div>
					}

					{!this.state.farm_balance_response ? "" :
						<div id="farm_balance_display_container">
							{this.state.farm_balance_response.map((farm) => {
								return (
									<div class="farm_balance_wrapper">
										<fieldset class="farm_balance_wrapper_fieldset">
											<legend align="center">{farm.symbol}</legend>
											<div class="farm_balance_amount_wrapper">
												<div class="fieldset_header">
													Current Balance (Farm Tokens)
												</div>
												<div class="text-center">
													{farm.farm_tokens}
												</div>
											</div>
											<div class="farm_balance_wrapper_left">
												<div class="fieldset_header">
													LP Balance (xUSD)
												</div>
												<div class="text-center">
													{farm.farm_lp_balance_xusd}
												</div>
											</div>
											<div class="farm_balance_wrapper_right">
												<div class="fieldset_header">
													LP Balance ({farm.paired_asset})
												</div>
												<div class="text-center">
													{farm.farm_lp_balance_paired_asset}
												</div>
											</div>
											<div class="clear"></div>
											<div class="farm_balance_spacer"></div>
											<div class="farm_balance_amount_wrapper">
												<div class="fieldset_header">
													LP Value (USD)
												</div>
												<div class="text-center">
													{farm.farm_lp_value_usd}
												</div>
											</div>
											<div class="farm_balance_amount_wrapper">
												<div class="fieldset_header">
													Time Until Unlock
												</div>
												<div class="text-center">
													{farm.time_until_unlock} days
												</div>
											</div>
											{farm.rewards_view}
										</fieldset>
									</div>
								);
							})}
							<p id="farm_balance_disclaimer">*Data provided by BSC and CoinGecko API's</p>
						</div>
					}
				</div>
			</div>
		)
	}
}

export default FarmBalanceChecker;