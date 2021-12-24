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
	const [activeWalletItem, setActiveWalletItem] = useState(0);
	const [tokenDisplayData, setTokenDisplayData] = useState("");
	const [farmDisplayData, setFarmDisplayData] = useState("");
	const [surgeFundDisplayData, setSurgeFundDisplayData] = useState("");
	const [walletUSDAmount, setWalletUSDAmount] = useState(0);

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

		// Start making wallet loading calls here and setting walletData
		grabWalletData(capturedWalletAddressValue);
	}

	const testConsoleLog = () => {
		console.log('testing to see if this comes up after grabWalletData()');
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
		let promises = [];
		let token_data = {};
		let farm_data = {};
		let bnb_price = 0;

		let bnb_pcs_addresses = [wbnb_address, busd_address];
		let get_bnb_raw_price = new Promise (function (resolve, reject) {
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
				bnb_price = web3.utils.fromWei(data[1], 'ether')
			}
		);

		for (const token in tokens) {
			token_data[tokens[token]["name"]] = {
				'name': tokens[token]['name'],
				'symbol': tokens[token]['symbol'],
				'underlying_asset': tokens[token]['uasset'],
				'decimals': tokens[token]['decimals'],
				'decimal_display': tokens[token]['decimal_display']
			};

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

			// get price of underlying asset here
			if (tokens[token]["uasset"] === 'BUSD') {
				token_data[tokens[token]["name"]]['ua_asset_price_raw'] = 1
			} else {
				let pcs_addresses = [web3.utils.toChecksumAddress(tokens[token]['uassetaddress']), busd_address];
				if (tokens[token]["uasset"] === 'USLS') {
					pcs_addresses = [wbnb_address, web3.utils.toChecksumAddress(tokens[token]['uassetaddress'])]
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
						token_data[tokens[token]["name"]]['ua_asset_price_raw'] = web3.utils.fromWei(data[1], tokens[token]['wei_unit'])
					}
				);
			}
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
					farm_data[farms[farm]["name"]]['farm_tokens'] = web3.utils.fromWei(data, farms[farm]["wei_unit"]);
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
		}

		Promise.allSettled(promises).then(
			result => {
				console.log(farm_data);

				let total_wallet_value = 0;
				let token_output = {};
				for (let token in token_data) {
					if (token_data[token]['balance'] > 0 && token_data[token]['name'] !== "SurgeUSD") {
						let balance = (token_data[token]['balance'] / 10**token_data[token]['decimals']);
						token_data[token]['balance'] = balance;
						token_data[token]['ua_amount'] = parseFloat(token_data[token]['balance']) * parseFloat(token_data[token]['token_price']);
						

						let ua_asset_price = token_data[token]['ua_asset_price_raw'];
						if (token_data[token]['underlying_asset'] === "USLS") {
							ua_asset_price = bnb_price/token_data[token]['ua_asset_price_raw'];
						}

						token_data[token]['ua_asset_price'] = ua_asset_price;

						token_data[token]['token_usd_value'] = token_data[token]['ua_asset_price'] * token_data[token]['ua_amount'];

						token_output[token] = token_data[token];

						total_wallet_value += token_output[token]['ua_asset_price'] * token_data[token]['ua_amount'];
					}
				}

				setWalletUSDAmount(total_wallet_value);
				setWalletData({"tokens": token_output, "farms": {}, "surge_fund": {}});
			}
		);
	}

	const buildTokensData = (tokens_data) => {
		const token_keys = Object.keys(tokens_data);

		return (
			<Row id="token_stats_wrapper">
				{token_keys.map((k) => {
					return (
						<Col xs={12} sm={6} md={4}>
							<div class="text-center token_stats_container">
								<h6 class="token_title">{tokens_data[k]['name']}</h6>
								<p class="token_display_amount top" >{tokens_data[k]['balance'].toLocaleString(undefined, {maximumFractionDigits: 5})}</p>
								<p class="token_display_amount" >{tokens_data[k]['ua_amount'].toLocaleString(undefined, {maximumFractionDigits: 5})} {tokens_data[k]['underlying_asset']}</p>
								<p class="token_display_amount bottom" >{tokens_data[k]['token_usd_value'].toLocaleString(undefined, {style: "currency", currency: "USD"})}</p>
							</div>
						</Col>
					);
				})}
			</Row>
		);
	}

	const buildFarmsData = (farms_data) => {
		const farms_keys = Object.keys(farms_data);

		return (
			<Row id="token_stats_wrapper">
				<Col xs={12} sm={6} md={4}>
					<div class="text-center token_stats_container">
						<h6 class="token_title">SUSD</h6>
						<p class="token_display_amount top" >Amount</p>
						<p class="token_display_amount" >USD Amount</p>
					</div>
				</Col>
				<Col xs={12} sm={6} md={4}>
					<div class="text-center token_stats_container">
						<h6 class="token_title">SETH</h6>
						<p class="token_display_amount top" >Amount</p>
						<p class="token_display_amount" >USD Amount</p>
					</div>
				</Col>
				<Col xs={12} sm={6} md={4}>
					<div class="text-center token_stats_container">
						<h6 class="token_title">SBTC</h6>
						<p class="token_display_amount top" >Amount</p>
						<p class="token_display_amount" >USD Amount</p>
					</div>
				</Col>
			</Row>
		);
	}

	const buildSurgeFundData = (surge_fund_data) => {
		return (
			<Row id="token_stats_wrapper">
				<Col xs={12} sm={6} md={4}>
					<div class="text-center token_stats_container">
						<h6 class="token_title">SUSD</h6>
						<p class="token_display_amount top" >Amount</p>
						<p class="token_display_amount" >USD Amount</p>
					</div>
				</Col>
				<Col xs={12} sm={6} md={4}>
					<div class="text-center token_stats_container">
						<h6 class="token_title">SETH</h6>
						<p class="token_display_amount top" >Amount</p>
						<p class="token_display_amount" >USD Amount</p>
					</div>
				</Col>
				<Col xs={12} sm={6} md={4}>
					<div class="text-center token_stats_container">
						<h6 class="token_title">SBTC</h6>
						<p class="token_display_amount top" >Amount</p>
						<p class="token_display_amount" >USD Amount</p>
					</div>
				</Col>
				<Col xs={12} sm={6} md={4}>
					<div class="text-center token_stats_container">
						<h6 class="token_title">SADA</h6>
						<p class="token_display_amount top" >Amount</p>
						<p class="token_display_amount" >USD Amount</p>
					</div>
				</Col>
				<Col xs={12} sm={6} md={4}>
					<div class="text-center token_stats_container">
						<h6 class="token_title">SUSLESS</h6>
						<p class="token_display_amount top" >Amount</p>
						<p class="token_display_amount" >USD Amount</p>
					</div>
				</Col>
				<Col xs={12} sm={6} md={4}>
					<div class="text-center token_stats_container">
						<h6 class="token_title">XUSD</h6>
						<p class="token_display_amount top" >Amount</p>
						<p class="token_display_amount" >USD Amount</p>
					</div>
				</Col>
			</Row>
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

	const handleCarouselSelect = (selectedIndex, e) => {
		setCarouselIndex(selectedIndex);
		setActiveWalletItem(selectedIndex);
	};

	//@todo on wallet input change we need to reset button values

	//const onSwipedLeft: () => {carouselRef.current.next()}

	// At launch of page load up wallet info
	useEffect(() => {
		if (!walletInitialized) {
			walletLoadInit();
		}

		if (Object.keys(walletData).length !== 0) {
			showLoadWalletButton(false, false, false);
			showRefreshWalletButton(true, true, false);

			setTokenDisplayData(buildTokensData(walletData['tokens']));
			setFarmDisplayData(buildFarmsData(walletData['farms']));
			setSurgeFundDisplayData(buildSurgeFundData(walletData['surge_fund']));
			setCarouselDisplay(true);
		}
	}, [walletData]);

	return (
		<div>
			<NavBar/>
			<Row id="surge_wallet_top_container">
				<Col xs={12}>
					<div class="text-center" id="wallet_items_container">
						<span onClick={(ev) => changeWalletItem(ev, 0)} className={`wallet_item first ${activeWalletItem === 0 ? 'active': ''}`}>Tokens</span>
						<span onClick={(ev) => changeWalletItem(ev, 1)} className={`wallet_item first ${activeWalletItem === 1 ? 'active': ''}`}>Farms</span>
						<span onClick={(ev) => changeWalletItem(ev, 2)} className={`wallet_item last ${activeWalletItem === 2 ? 'active': ''}`}>Surge Fund</span>
					</div>
					<div class="text-center" id="capture_surge_wallet_address_container">
						<Collapse in={walletError}>
							<div>
								<Alert style={{padding: '10px', margin: '0 auto 10px auto', maxWidth: '450px'}} variant="danger">
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
							<i xs={1} class="fas fa-cog"  onClick={expandSettings}></i>

							<Collapse in={walletSettingsContainerState}>
								<div id="wallet_settings_container" >
									Enable Auto Load
									Clear Cookies
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
				<Col xs={12} style={{visibility: (activeWalletItem === 2 ? 'hidden' : 'visible')}}>
					<div id="surge_wallet_total_amount_container" class="text-center">
						<h6 id="total_holdings_value_header">Total Holdings Value</h6>
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
						<Carousel.Item>
							{surgeFundDisplayData}
						</Carousel.Item>
					</Carousel>
				</div>
			</Row>
			<Footer/>
		</div>
	);
};

export default Wallet