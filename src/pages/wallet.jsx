import React, { useRef } from "react";
import { useSwipeable } from 'react-swipeable';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Collapse from 'react-bootstrap/Collapse';
import Carousel from 'react-bootstrap/Carousel';
import Alert from 'react-bootstrap/Alert';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Web3 from 'web3';
import {useState, useEffect} from 'react';
import Cookies from 'js-cookie'
import Spinner from 'react-bootstrap/Spinner';
import * as SurgeAssets from '../components/SurgeAssetData';
import PCSABI from '../components/json/bsc_abis/pcs_abi.json';

const tokens = SurgeAssets.getSurgeTokensData();
const farms = SurgeAssets.getSurgeFarmsData();

const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const pcs_router_address = web3.utils.toChecksumAddress("0x10ED43C718714eb63d5aA57B78B54704E256024E");
const wbnb_address = web3.utils.toChecksumAddress("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");
const busd_address = web3.utils.toChecksumAddress("0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56");

const pcs_router = new web3.eth.Contract(PCSABI, pcs_router_address);

const Wallet = () => {
	const [walletInitialized, setWalletInitialized] = useState(false);
	const [capturedWalletAddressValue, setCapturedWalletAddressValue] = useState(Cookies.get('public_surge_wallet_address'));
	const [walletSettingsContainerState, setWalletSettingsContainerState] = useState(false);
	const [walletError, setWalletError] = useState(false);
	const [walletErrorVariant, setWalletErrorVariant] = useState("");
	const [walletErrorText, setWalletErrorText] = useState("");
	const [carouselIndex, setCarouselIndex] = useState(0);
	const [carouselDisplay, setCarouselDisplay] = useState(false);
	const [walletRefreshTextDisplay, setWalletRefreshTextDisplay] = useState(false);
	const [walletRefreshSpinnerDisplay, setWalletRefreshSpinnerDisplay] = useState(false);
	const [walletRefreshButtonDisplay, setWalletRefreshButtonDisplay] = useState(false);
	const [walletLoadTextDisplay, setWalletLoadTextDisplay] = useState(true);
	const [walletLoadSpinnerDisplay, setWalletLoadSpinnerDisplay] = useState(false);
	const [walletLoadButtonDisplay, setWalletLoadButtonDisplay] = useState(true);
	const [walletData, setWalletData] = useState({});
	const [tokenDisplaySort, setTokenDisplaySort] = useState([]);
	const [farmDisplaySort, setFarmDisplaySort] = useState([]);
	const [activeWalletItem, setActiveWalletItem] = useState(0);
	const [tokenDisplayData, setTokenDisplayData] = useState("");
	const [farmDisplayData, setFarmDisplayData] = useState("");
	const [surgeFundDisplayData, setSurgeFundDisplayData] = useState("");
	const [walletUSDAmount, setWalletUSDAmount] = useState(0);
	const [showAnchorIncreasesSwitch, setShowAnchorIncreasesSwitch] = useState(false);
	const [showPricesSwitch, setShowPricesSwitch] = useState(false);
	const [showPricesSwitchDisabled, setShowPricesSwitchDisabled] = useState(true);
	
	const [showAnchorIncreasesToolTip, setShowAnchorIncreasesToolTip] = useState(false);
	const show_anchor_increases_target = useRef(null);
	
	const [showHoldingsToolTip, setShowHoldingsToolTip] = useState(false);
	const holdings_tooltip_target = useRef(null);
	
	const [showAnchorsModal, setShowAnchorsModal] = useState(false);
	const handleAnchorsModalClose = () => setShowAnchorsModal(false);
	const handleAnchorsModalShow = () => setShowAnchorsModal(true);

	const handlers = useSwipeable({
		onSwipedLeft: () => console.log('swiped left'),
		onSwipedRight: () => console.log('swiped right'),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true
  	});

	const showLoadWalletButton = (show, show_text, show_spinner) => {
		setWalletLoadButtonDisplay(show);
		setWalletLoadTextDisplay(show_text);
		setWalletLoadSpinnerDisplay(show_spinner);
	}

	const showRefreshWalletButton = (show, show_text, show_spinner) => {
		setWalletRefreshButtonDisplay(show);
		setWalletRefreshTextDisplay(show_text);
		setWalletRefreshSpinnerDisplay(show_spinner);
	}

	const walletLoadInit = () => {
		setWalletInitialized(true);

		// if no wallet is set dont do anything because we need their wallet to load up their info
		if (capturedWalletAddressValue == undefined) {
			return;
		}

		// If we have their wallet data stored, we should start loading up wallet data
		setWalletLoadSpinnerDisplay(true);
		setWalletLoadTextDisplay(false);

		let show_prices_switch_cookie = Cookies.get('surge_holdings_show_prices');
		if (show_prices_switch_cookie === 'true') {
			setShowPricesSwitch(true);
		} else {
			setShowPricesSwitch(false);
		}

		// Start making wallet loading calls here and setting walletData
		grabWalletData(capturedWalletAddressValue);
	}

	const loadWalletData = () => {
		setWalletLoadSpinnerDisplay(true);
		setWalletLoadTextDisplay(false);
		setWalletRefreshSpinnerDisplay(false);
		setWalletRefreshButtonDisplay(false);
		setWalletRefreshTextDisplay(false);

		//run wallet validation 
		if (capturedWalletAddressValue == undefined || capturedWalletAddressValue.length == 0) {
			setWalletError(true);
			setWalletErrorVariant("danger");
			setWalletErrorText("Supplied wallet address is invalid");
			showLoadWalletButton(true, true, false);
			showRefreshWalletButton(false, false, false);
			return;
		}

		let formated_wallet_address = "";
		let wallet_address = capturedWalletAddressValue;

		// Check to see if the supplied address is valid/invalid
		try {
			formated_wallet_address = web3.utils.toChecksumAddress(wallet_address);
		} catch(err) {
			setWalletError(true);
			setWalletErrorText("Supplied wallet address is invalid");
			setWalletErrorVariant("danger");
			showLoadWalletButton(true, true, false);
			showRefreshWalletButton(false, false, false);
			return;
		}

		setWalletError(false);

		// Set Public Wallet Address Cookie
		Cookies.set('public_surge_wallet_address', formated_wallet_address, {expires: 30, path: '/' });

		grabWalletData(wallet_address);
	}

	const refreshWalletData = () => {
		setWalletLoadSpinnerDisplay(false);
		setWalletLoadButtonDisplay(false);
		setWalletLoadTextDisplay(false);
		setWalletRefreshSpinnerDisplay(true);
		setWalletRefreshTextDisplay(false);

		grabWalletData(capturedWalletAddressValue);
	}

	const grabWalletData = (wallet_address) => {
		const promises = [];
		const token_data = {};
		const farm_data = {};
		const surge_fund_data = {};
		let bnb_price = 0;
		const assets_to_get_prices = {};
		const asset_prices_raw = {};

		const bnb_pcs_addresses = [wbnb_address, busd_address];
		const get_bnb_raw_price = new Promise (function (resolve, reject) {
			pcs_router.methods.getAmountsOut('1000000000000000000', bnb_pcs_addresses).call({}, function(error, result) {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		});
		promises.push(get_bnb_raw_price);
		get_bnb_raw_price.then(
			data => {
				bnb_price = web3.utils.fromWei(data[1], 'ether');
				asset_prices_raw['BNB'] = web3.utils.fromWei(data[1], 'ether');
			}
		);

		for (const token in tokens) {
			token_data[tokens[token]["name"]] = tokens[token];

			assets_to_get_prices[tokens[token]['uasset']] = {"address": tokens[token]['uassetaddress'], "wei_unit": tokens[token]['wei_unit']};

			let contract = new web3.eth.Contract(tokens[token]["abi"], tokens[token]["address"]);

			// Lookup / Set token balance depending on selected token
			let balance_of = new Promise (function (resolve, reject) {
				contract.methods.balanceOf(wallet_address).call({}, function(error, result) {
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
					if (data > 0) {
						token_data[tokens[token]["name"]]['balance'] = data;
					}
				}
			);

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
					token_data[tokens[token]["name"]]['token_price'] = web3.utils.fromWei(data, tokens[token]["wei_unit"]);
				}
			);
		}

		for (const farm in farms) {
			farm_data[farms[farm]["name"]] = farms[farm]; 

			let contract = new web3.eth.Contract(farms[farm]["abi"], farms[farm]["address"]);

			// Get farm token balance
			let balance_of = new Promise (function (resolve, reject) {
				contract.methods.balanceOf(wallet_address).call({}, function(error, result) {
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
					farm_data[farms[farm]["name"]]['farm_tokens'] = parseFloat(web3.utils.fromWei(data, farms[farm]["wei_unit"]));
				}
			);

			// Get farm redeemable value balance
			let redeemable_value = new Promise (function (resolve, reject) {
				contract.methods.getRedeemableValue(wallet_address).call({}, function(error, result) {
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
					farm_data[farms[farm]["name"]]['xusd_value'] = web3.utils.fromWei(data[0], farms[farm]["wei_unit"]);
					if (farms[farm]["is_paired_asset_surge_token"]) {
						farm_data[farms[farm]["name"]]['paired_asset_value'] = data[1];
					} else {
						farm_data[farms[farm]["name"]]['paired_asset_value'] = web3.utils.fromWei(data[1], farms[farm]["wei_unit"]);
					}
				}
			);

			// Get farm time until unlock
			let time_until_unlock = new Promise (function (resolve, reject) {
				contract.methods.getTimeUntilUnlock(wallet_address).call({}, function(error, result) {
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
					farm_data[farms[farm]["name"]]['time_until_unlock'] = formated_time_until_unlock;
				}
			);

			// Get farm pending rewards
			let pending_rewards = new Promise (function (resolve, reject) {
				contract.methods.pendingRewards(wallet_address).call({}, function(error, result) {
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
					if (!farms[farm]["split_rewards"]) {
						farm_data[farms[farm]["name"]]['pending_rewards_xusd'] = web3.utils.fromWei(data, farms[farm]["wei_unit"]);
					} else {
						farm_data[farms[farm]["name"]]['pending_rewards_xusd'] = web3.utils.fromWei(data[0], farms[farm]["wei_unit"]);
						if (farms[farm]["is_paired_asset_surge_token"]) {
							farm_data[farms[farm]["name"]]['pending_rewards_paired_asset'] = data[1];
						} else {
							farm_data[farms[farm]["name"]]['pending_rewards_paired_asset'] = web3.utils.fromWei(data[1], farms[farm]["paired_asset_wei_unit"]);
						}
					}
				}
			);

			// Get farm total rewards claimed
			let total_rewards_claimed = new Promise (function (resolve, reject) {
				contract.methods.totalRewardsClaimedForUser(wallet_address).call({}, function(error, result) {
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
					if (!farms[farm]["split_rewards"]) {
						farm_data[farms[farm]["name"]]['total_rewards_claimed_xusd'] = web3.utils.fromWei(data, farms[farm]["wei_unit"]);
					} else {
						farm_data[farms[farm]["name"]]['total_rewards_claimed_xusd'] = web3.utils.fromWei(data[0], farms[farm]["wei_unit"]);
						if (farms[farm]["is_paired_asset_surge_token"]) {
							farm_data[farms[farm]["name"]]['total_rewards_claimed_paired_asset'] = data[1];
						} else {
							farm_data[farms[farm]["name"]]['total_rewards_claimed_paired_asset'] = web3.utils.fromWei(data[1], farms[farm]["paired_asset_wei_unit"]);
						}
					}
				}
			);
		}

		for (const asset in assets_to_get_prices) {
			// get price of underlying asset here
			if (asset === 'BUSD') {
				asset_prices_raw[asset] = 1
			} else {
				let pcs_addresses = [web3.utils.toChecksumAddress(assets_to_get_prices[asset]['address']), busd_address];
				if (asset === 'USLS') {
					pcs_addresses = [wbnb_address, web3.utils.toChecksumAddress(assets_to_get_prices[asset]['address'])]
				}
				let get_ua_raw_price = new Promise (function (resolve, reject) {
					pcs_router.methods.getAmountsOut('1000000000000000000', pcs_addresses).call({}, function(error, result) {
						if (error) {
							reject(error);
						} else {
							resolve(result);
						}
					});
				});
				promises.push(get_ua_raw_price);
				get_ua_raw_price.then(
					data => {
						asset_prices_raw[asset] = web3.utils.fromWei(data[1], assets_to_get_prices[asset]['wei_unit'])
					}
				);
			}
		}

		Promise.allSettled(promises).then(
			result => {
				let surge_token_prices = {};
				let total_wallet_value = 0;
				let token_output = {};
				let farm_output = {};
				let token_display_sort = [];
				let farm_display_sort = [];

				asset_prices_raw['USLS'] = bnb_price/asset_prices_raw['USLS'];

				for (let token in token_data) {
					surge_token_prices[token] = token_data[token]['token_price'];

					if (token_data[token]['balance'] > 0) {
						let balance = (token_data[token]['balance'] / 10**token_data[token]['decimals']);
						token_data[token]['balance'] = balance;
						token_data[token]['ua_amount'] = parseFloat(token_data[token]['balance']) * parseFloat(token_data[token]['token_price']);
						
						let ua_asset_price = asset_prices_raw[token_data[token]['uasset']];

						token_data[token]['ua_asset_price'] = ua_asset_price;

						token_data[token]['token_usd_value'] = token_data[token]['ua_asset_price'] * token_data[token]['ua_amount'];

						token_output[token] = token_data[token];

						total_wallet_value += token_output[token]['ua_asset_price'] * token_data[token]['ua_amount'];

						token_display_sort.push([token, token_data[token]['token_usd_value']]);
					}
				}

				token_display_sort.sort(function(a, b) {
					return b[1] - a[1];
				});

				setTokenDisplaySort(token_display_sort);

				for (let farm in farm_data) {
					if (farm_data[farm]['farm_tokens'] > 0) {
						// Set Farm LP Value
						let xusd_lp_value = farm_data[farm]['xusd_value'] * surge_token_prices['xUSD'];
						let paired_asset_lp_value = farm_data[farm]['paired_asset_value'];

						if (farm_data[farm]['is_paired_asset_surge_token']) {
							paired_asset_lp_value = paired_asset_lp_value * parseFloat(surge_token_prices[farm_data[farm]['surge_token']]) * parseFloat(asset_prices_raw[farm_data[farm]['paired_asset_underlying_asset']]);
						} else {
							paired_asset_lp_value = paired_asset_lp_value * parseFloat(asset_prices_raw[farm_data[farm]['paired_asset']]);
						}
						farm_data[farm]['lp_value'] = xusd_lp_value + paired_asset_lp_value;

						// Set pending rewards Value
						let xusd_pending_value = farm_data[farm]['pending_rewards_xusd'] * surge_token_prices['xUSD'];
						let paired_asset_pending_value = 0;
						if (farm_data[farm]['split_rewards']) {
							if (farm_data[farm]['is_paired_asset_surge_token']) {
								paired_asset_pending_value = farm_data[farm]['pending_rewards_paired_asset'] * parseFloat(surge_token_prices[farm_data[farm]['surge_token']]) * parseFloat(asset_prices_raw[farm_data[farm]['paired_asset_underlying_asset']]);
							}
						}
						farm_data[farm]['pending_rewards_value'] = xusd_pending_value + paired_asset_pending_value;

						farm_output[farm] = farm_data[farm];

						total_wallet_value += farm_data[farm]['lp_value'];

						farm_display_sort.push([farm, farm_data[farm]['lp_value']]);
					}
				}

				farm_display_sort.sort(function(a, b) {
					return b[1] - a[1];
				});

				setFarmDisplaySort(farm_display_sort);

				setWalletUSDAmount(total_wallet_value);
				setWalletData({"tokens": token_output, "farms": farm_output, "surge_fund": {}});
			}
		);
	}

	const buildTokensData = (tokens_data) => {
		return (
			<Row className="justify-content-md-center" id="token_stats_wrapper">
				{tokenDisplaySort.map((k) => {
					let token_logo = "assets/img/token_logos/"+tokens_data[k[0]]['token_logo'];
					return (
						<Col className="token_stats_container_col" xs={12} sm={12} md={6} lg={4}>
							<div class="text-center token_stats_container">
								<Row className="token_header_container" >
									<Col className="token_title_col" style={{textAlign: 'left'}} xs={9}>
										<h6 class="token_title">{tokens_data[k[0]]['name']}</h6>
									</Col>
									<Col style={{textAlign: 'right'}} xs={3}>
										<Image src={token_logo} className="token_image" />
									</Col>
								</Row>
								<p class="token_display_header top" >Token Balance</p>
								<p class="token_display_amount" >{tokens_data[k[0]]['balance'].toLocaleString(undefined, {maximumFractionDigits: 5})}</p>
								<p class="token_display_header" >Amount ({tokens_data[k[0]]['uasset']})</p>
								<p class="token_display_amount" >{tokens_data[k[0]]['ua_amount'].toLocaleString(undefined, {maximumFractionDigits: 5})} {tokens_data[k[0]]['underlying_asset']}</p>
								<p class="token_display_header" >Amount (USD)</p>
								<p class="token_display_amount" >{tokens_data[k[0]]['token_usd_value'].toLocaleString(undefined, {style: "currency", currency: "USD"})}</p>
								<p class="token_display_header" style={{ display: (showPricesSwitch ? 'inline-block' : 'none') }} >Token Price</p>
								<p class="token_display_amount" style={{ display: (showPricesSwitch ? 'block' : 'none') }} >{tokens_data[k[0]]['token_price']}</p>
							</div>
						</Col>
					);
				})}
			</Row>
		);
	}

	const buildFarmsData = (farms_data) => {
		return (
			<Row className="justify-content-md-center" id="token_stats_wrapper">
				{farmDisplaySort.map((k) => {
					let farm_logo = "assets/img/farm_logos/"+farms_data[k[0]]['farm_logo'];
					return (
						<Col className="token_stats_container_col" xs={12} sm={12} md={6} lg={4}>
							<div class="text-center token_stats_container">
								<Row className="token_header_container" >
									<Col className="token_title_col" style={{textAlign: 'left'}} xs={7}>
										<h6 class="token_title">{farms_data[k[0]]['display_name']}</h6>
									</Col>
									<Col style={{textAlign: 'right'}} xs={5}>
										<Image src={farm_logo} className="farm_image" />
									</Col>
								</Row>
								<p class="token_display_header top" >Farm Balance</p>
								<p class="token_display_amount" >{farms_data[k[0]]['farm_tokens'].toLocaleString(undefined, {maximumFractionDigits: 5})}</p>
								<p class="token_display_header" >LP Balance (xUSD / {farms_data[k[0]]['paired_asset']})</p>
								<p class="token_display_amount" >{parseFloat(farms_data[k[0]]['xusd_value']).toLocaleString(undefined, {maximumFractionDigits: 5})} / {parseFloat(farms_data[k[0]]['paired_asset_value']).toLocaleString(undefined, {maximumFractionDigits: 5})}</p>
								<p class="token_display_header" >Farm Value</p>
								<p class="token_display_amount" >{farms_data[k[0]]['lp_value'].toLocaleString(undefined, {style: "currency", currency: "USD"})}</p>
								{buildPendingRewards(farms_data, k[0])}
								<p class="token_display_header" >Pending Rewards (USD)</p>
								<p class="token_display_amount" >{farms_data[k[0]]['pending_rewards_value'].toLocaleString(undefined, {style: "currency", currency: "USD"})}</p>
								{buildTotalClaimed(farms_data, k[0])}
								{buildTimeToUnlock(farms_data, k[0])}
							</div>
						</Col>
					);
				})}
			</Row>
		);
	}

	const buildPendingRewards = (farms_data, farm) => {
		if (farms_data[farm]['split_rewards']) {
			return (
				<>
				<p class="token_display_header" >Pending Rewards (xUSD / {farms_data[farm]['paired_asset']})</p>
				<p class="token_display_amount" >{parseFloat(farms_data[farm]['pending_rewards_xusd']).toLocaleString(undefined, {maximumFractionDigits: 5})} / {parseFloat(farms_data[farm]['pending_rewards_paired_asset']).toLocaleString(undefined, {maximumFractionDigits: 5})}</p>
				</>
			);
		} else {
			return (
				<>
				<p class="token_display_header">Pending Rewards (xUSD)</p>
				<p class="token_display_amount">{parseFloat(farms_data[farm]['pending_rewards_xusd']).toLocaleString(undefined, {maximumFractionDigits: 5})}</p>
				</>
			);
		}
	}

	const buildTotalClaimed = (farms_data, farm) => {
		if (farms_data[farm]['split_rewards']) {
			return (
				<>
				<p class="token_display_header" >Total Claimed (xUSD / {farms_data[farm]['paired_asset']})</p>
				<p class="token_display_amount" >{parseFloat(farms_data[farm]['total_rewards_claimed_xusd']).toLocaleString(undefined, {maximumFractionDigits: 5})} / {parseFloat(farms_data[farm]['total_rewards_claimed_paired_asset']).toLocaleString(undefined, {maximumFractionDigits: 5})}</p>
				</>
			);
		} else {
			return (
				<>
				<p class="token_display_header" >Total Claimed (xUSD)</p>
				<p class="token_display_amount" >{parseFloat(farms_data[farm]['total_rewards_claimed_xusd']).toLocaleString(undefined, {maximumFractionDigits: 5})}</p>
				</>
			);
		}
	}

	const buildTimeToUnlock = (farms_data, farm) => {
		let time_until_unlock = Math.round(farms_data[farm]['time_until_unlock']);
		let days_display = "days";
		if (time_until_unlock == 1) {
			days_display = 'day';
		}

		return (
			<>
			<p class="token_display_header" >Days Until Unlock</p>
			<p class="token_display_amount bottom" >{time_until_unlock} {days_display}</p>	
			</>
		);
		
	}

	const expandSettings = () => {
		setWalletSettingsContainerState(!walletSettingsContainerState);
	}

	const changeWalletItem = (ev, newCarouselIndex) => {
		setCarouselIndex(newCarouselIndex);
		setActiveWalletItem(newCarouselIndex);
	}

	const handleWalletAddressInput = (e) => {
		setCapturedWalletAddressValue(e.target.value);

		setWalletLoadSpinnerDisplay(false);
		setWalletLoadButtonDisplay(true);
		setWalletLoadTextDisplay(true);
		setWalletRefreshSpinnerDisplay(false);
		setWalletRefreshButtonDisplay(false);
		setWalletRefreshTextDisplay(false);
	};

	const updateShowIncreasesSwitch = () => {
		setShowAnchorIncreasesSwitch(!showAnchorIncreasesSwitch);
		// Update Cookies
		// Show anchor increases
	};

	const updateShowPricesSwitch = () => {
		setShowPricesSwitch(!showPricesSwitch);
	};

	const handleCarouselSelect = (selectedIndex, e) => {
		setCarouselIndex(selectedIndex);
		setActiveWalletItem(selectedIndex);
	};

	const clearCookieData = () => {
		setWalletError(true);
		setWalletErrorText("Cookies Successfully Cleared");
		setWalletErrorVariant("success");
		Cookies.remove('public_surge_wallet_address');
		Cookies.remove('surge_holdings_show_prices');
		setWalletData({});
		setCapturedWalletAddressValue("");
		setShowPricesSwitch(false);
		showLoadWalletButton(true, true, false);
		showRefreshWalletButton(false, false, false);
		setCarouselDisplay(false);
	};

	// At launch of page load up wallet info
	useEffect(() => {
		if (!walletInitialized) {
			walletLoadInit();
		}

		if (Object.keys(walletData).length !== 0) {
			showLoadWalletButton(false, false, false);
			showRefreshWalletButton(true, true, false);

			setShowPricesSwitchDisabled(false);

			setTokenDisplayData(buildTokensData(walletData['tokens']));
			setFarmDisplayData(buildFarmsData(walletData['farms']));
			setCarouselDisplay(true);
		} else {
			setShowPricesSwitchDisabled(true);
		}
	}, [walletData]);

	useEffect(() => {
		if ('tokens' in walletData) {
			setTokenDisplayData(buildTokensData(walletData['tokens']));
		}
		Cookies.set('surge_holdings_show_prices', showPricesSwitch, {expires: 30, path: '/' });
	}, [showPricesSwitch]);

	// Update manifest link so that state_url will point to surge holdings page
	useEffect(() => {
		document.querySelector('#manifest').href = '/manifest_holdings.json';
	},[]);

	return (
		<div>
			<NavBar/>
			<Row id="surge_holdings_image_row">
				<Col xs={12} sm={12} md={12} lg={12} xl={12} className="holdings_logo">
					<Image src="assets/img/surge_holdings.png" className="surgeHoldingsTitle" />
				</Col>
			</Row>
			<Row id="surge_wallet_top_container">
				<Col xs={12}>
					<div class="text-center" id="wallet_items_container">
						<span onClick={(ev) => changeWalletItem(ev, 0)} className={`wallet_item first ${activeWalletItem === 0 ? 'active': ''}`}>Tokens</span>
						<span onClick={(ev) => changeWalletItem(ev, 1)} className={`wallet_item first ${activeWalletItem === 1 ? 'active': ''}`}>Farms</span>
					</div>
					<div class="text-center" id="capture_surge_wallet_address_container">
						<Collapse in={walletError}>
							<div>
								<Alert style={{padding: '10px', margin: '0 auto 10px auto', maxWidth: '450px'}} variant={walletErrorVariant}>
									{walletErrorText}
								</Alert>
							</div>
						</Collapse>
						<div id='surge_wallet_address_input_wrapper'>
							<input
								className={`capture_surge_wallet_address_input ${walletSettingsContainerState == true ? 'settings_active': ''}`}
								id="surge_wallet_address_input"
								value={capturedWalletAddressValue}
								type="text"
								placeholder="Enter BEP-20 Public Wallet Address"
								onChange={handleWalletAddressInput}
							/>
							<i xs={1} id="wallet_settings_icon" class="fas fa-cog"  onClick={expandSettings}></i>

							<Collapse in={walletSettingsContainerState}>
								<div id="wallet_settings_container">
									<div id="anchors_container">
										<div class="settings_buttons" id="anchors_button" onClick={handleAnchorsModalShow}>
											Set Token Anchors
										</div>
									</div>
									<Modal id="set_anchors_dialog" show={showAnchorsModal} onHide={handleAnchorsModalClose}>
										<Modal.Header>
											<Modal.Title>Set Anchors</Modal.Title>
											<CloseButton variant="white" onClick={handleAnchorsModalClose} />
										</Modal.Header>
										<Modal.Body>
											This is where people will set their anchors so they can see increases
										</Modal.Body>
									</Modal>
									<div id="wallet_settings_switches_container">
										<Form className="wallet_settings_switches_form top">
											<label className="wallet_settings_switches_label">Show Anchor Increases <i class="wallet_settings_switch_info_icon fas fa-info-circle" ref={show_anchor_increases_target} onClick={() => setShowAnchorIncreasesToolTip(!showAnchorIncreasesToolTip)}></i></label>
											<Overlay target={show_anchor_increases_target.current} show={showAnchorIncreasesToolTip} placement="left">
												{({ placement, arrowProps, show: _show, popper, ...props }) => (
													<div
														{...props}
														style={{
														backgroundColor: 'rgb(41, 203, 193)',
														padding: '2px 10px',
														color: 'black',
														borderRadius: 3,
														width: '190px',
														marginRight: '5px',
														...props.style,
														}}
													>
														This is the Info Icon For Anchor Increases
													</div>
												)}
											</Overlay>
											<Form.Check 
												className="wallet_settings_switches"
												type="switch"
												id="show_increases"
												checked={showAnchorIncreasesSwitch}
												onChange={updateShowIncreasesSwitch}
											/>
											<div class="clear"></div>
										</Form>
										<Form className="wallet_settings_switches_form">
											<label className="wallet_settings_switches_label">Show Prices</label>
											<Form.Check 
												className="wallet_settings_switches"
												type="switch"
												id="show_prices"
												checked={showPricesSwitch}
												onChange={updateShowPricesSwitch}
												disabled={showPricesSwitchDisabled}
											/>
											<div class="clear"></div>
										</Form>
									</div>
									<div class="settings_buttons_container">
										<div class="settings_buttons" id="clear_cookies" onClick={clearCookieData}>
											Clear Cookies
										</div>
									</div>
								</div>
							</Collapse>
						</div>

						<div id="wallet_load_button" onClick={loadWalletData} style={{ display: (walletLoadButtonDisplay ? 'inline-block' : 'none') }}>
							<Spinner size="sm" id="wallet_load_button_spinner" style={{ display: (walletLoadSpinnerDisplay ? 'inline-block' : 'none') }} animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
							<span id="wallet_load_button_text" style={{ display: (walletLoadTextDisplay ? 'inline-block' : 'none') }}>
								Load
							</span>
						</div>
						<div id="wallet_refresh_button" onClick={refreshWalletData} style={{ display: (walletRefreshButtonDisplay ? 'inline-block' : 'none') }}>
							<Spinner size="sm" id="wallet_refresh_button_spinner" style={{ display: (walletRefreshSpinnerDisplay ? 'inline-block' : 'none') }} animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
							<span id="wallet_refresh_button_text" style={{ display: (walletRefreshTextDisplay ? 'inline-block' : 'none') }}>
								Refresh
							</span>
						</div>
					</div>
				</Col>
			</Row>

			<Row style={{display: (carouselDisplay ? 'block' : 'none'), opacity:(walletRefreshSpinnerDisplay ? '.3' : ''), paddingTop: '15px'}}>
				<Col xs={12} style={{display: (activeWalletItem === 2 ? 'none' : 'block')}}>
					<div id="surge_wallet_total_amount_container" class="text-center">
						<h6 id="total_holdings_value_header">Total Holdings Value <i id="holdings_tooltip_icon" ref={holdings_tooltip_target} onClick={() => setShowHoldingsToolTip(!showHoldingsToolTip)} class="wallet_settings_swithc_info_icon fas fa-info-circle"></i></h6>
						<Overlay target={holdings_tooltip_target.current} show={showHoldingsToolTip} placement="left">
							{({ placement, arrowProps, show: _show, popper, ...props }) => (
								<div
									{...props}
									style={{
									backgroundColor: 'rgb(41, 203, 193)',
									padding: '2px 10px',
									color: 'black',
									borderRadius: 3,
									width: '190px',
									marginRight: '5px',
									...props.style,
									}}
								>
									This is your total value in USD for all Surge Tokens and Farms that you hold
								</div>
							)}
						</Overlay>
						<h1>{walletUSDAmount.toLocaleString(undefined, {style: "currency", currency: "USD"})}</h1>
					</div>
				</Col>

				<div {...handlers}>
					<Carousel onSelect={handleCarouselSelect} style={{display: (carouselDisplay ? 'block' : 'none')}} activeIndex={carouselIndex} touch={true} id="wallet_data_carousel" indicators={false} controls={false} interval={null}>
						<Carousel.Item>
							{tokenDisplayData}
						</Carousel.Item>
						<Carousel.Item>
							{farmDisplayData}
						</Carousel.Item>
					</Carousel>
				</div>
			</Row>
			<Footer/>
		</div>
	);
};

export default Wallet