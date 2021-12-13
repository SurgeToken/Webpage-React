import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import TokenBalanceChecker from "../components/TokenBalanceChecker";
import Web3 from 'web3';
import {useState, useEffect} from 'react';
import Cookies from 'js-cookie'
import Spinner from 'react-bootstrap/Spinner';
import SURGEFUNDABI from '../components/json/token_abis/surge_fund_abi.json';

const surgeFundContractAddress = "0x8078380508c16C9F122D62771714701612Eb3fa8";
const surgeFundABI = SURGEFUNDABI;
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const SurgeFund = () => {
	const [captureSurgeFundWalletAddressvalue, setCaptureSurgeFundWalletAddressvalue] = useState(Cookies.get('public_surge_fund_wallet_address'));
	const [checkSurgeFundBalanceButtonSpinnerClass, setCheckSurgeFundBalanceButtonSpinnerClass] = useState("hide");
	const [checkSurgeFundBalanceButtonTextClass, setCheckSurgeFundBalanceButtonTextClass] = useState("");
	const [surgeFundResponse, setSurgeFundResponse] = useState([]);
	const [surgeFundErrorMessage, setSurgeFundErrorMessage] = useState("");
	const [errorMessageClass, setErrorMessageClass] = useState("");

	const handleUserInput = (e) => {
		setCaptureSurgeFundWalletAddressvalue(e.target.value)
	};

	const lookupSurgeFundBalances = (ev) => {
		let formated_wallet_address = "";

		setCheckSurgeFundBalanceButtonSpinnerClass("");
		setCheckSurgeFundBalanceButtonTextClass("hide");

		let wallet_address = captureSurgeFundWalletAddressvalue;
		// Check to see if the supplied address is valid/invalid
		try {
			formated_wallet_address = web3.utils.toChecksumAddress(wallet_address);
		} catch(err) {
			setSurgeFundErrorMessage("Supplied wallet address is invalid");
			setErrorMessageClass("show");
			setCheckSurgeFundBalanceButtonSpinnerClass("hide");
			setCheckSurgeFundBalanceButtonTextClass("");
			return;
		}

		// Set Public Wallet Address Cookie
		Cookies.set('public_surge_fund_wallet_address', formated_wallet_address, {expires: 30, path: '/' });

		let promises = [];
		let surge_fund_response = [];
		let contract = new web3.eth.Contract(surgeFundABI, surgeFundContractAddress);

		let get_balance_of = new Promise (function (resolve, reject) {
			contract.methods.balanceOf(formated_wallet_address).call({}, function(error, result) {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		});
		promises.push(get_balance_of);
		get_balance_of.then(
			data => {
				surge_fund_response['balance'] = web3.utils.fromWei(data, 'ether');
			}
		);

		let bnb_to_claim = new Promise (function (resolve, reject) {
			contract.methods.bnbToClaimForVictim(formated_wallet_address).call({}, function(error, result) {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		});
		promises.push(bnb_to_claim);
		bnb_to_claim.then(
			data => {
				surge_fund_response['bnb_to_claim'] = web3.utils.fromWei(data, 'ether');
			}
		);

		Promise.allSettled(promises).then(
			result => {
				let can_make_claim = "No (Your current claim < 0.002 BNB)";
				if (parseFloat(surge_fund_response['balance']) >= .002) {
					can_make_claim = "Yes";
				}

				let output = [
					{
						'balance' : surge_fund_response['balance'],
						'bnb_to_claim' : surge_fund_response['bnb_to_claim'],
						'can_make_claim' : can_make_claim
					}
				];

				console.log(output);

				setSurgeFundResponse(output);
				setCheckSurgeFundBalanceButtonSpinnerClass("hide");
				setCheckSurgeFundBalanceButtonTextClass("");

			}
		);
	}

	return (
		<div>
			<NavBar/>
			<Row>
				<Col xs={12} sm={12} md={12} lg={12} xl={12} className="edLogo">
					<Image src="assets/img/surge_fund_title.png" className="surgeFundTitle" />
				</Col>
			</Row>
			<Row>
				<Col xs={12} sm={12} md={12} lg={6} xl={6} className="">
					<div className="widget tokenList2">
						<p>To check your current Surge Fund details, please enter your BEP-20 Public Wallet Address below</p>
						<div id="token_balance_checker_error_container" class={errorMessageClass}>
							<p id="token_balance_checker_error_message">{surgeFundErrorMessage}</p>
						</div>
						<div id="capture_surge_fund_address_container">
							<input
								class="capture_surge_fund_address_input"
								id="surge_fund_address_input"
								value={captureSurgeFundWalletAddressvalue}
								type="text"
								placeholder="Enter BEP-20 Public Wallet Address"
								onChange={handleUserInput}
							/>
							
							<div id="capture_token_balance_button" onClick={(ev) => lookupSurgeFundBalances(ev)}>
								<Spinner size="sm" id="balance_check_button_spinner" className={checkSurgeFundBalanceButtonSpinnerClass} animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
								<span id="check_balance_button_text" class={checkSurgeFundBalanceButtonTextClass}>
									Check
								</span>
							</div>
						</div>
						{!surgeFundResponse ? "" :
							<div id="token_balance_display_container">
								{surgeFundResponse.map((data) => {
									return (
										<div class="token_balance_wrapper">
											<fieldset class="token_balance_wrapper_fieldset">
												<legend align="center">SurgeFund Details</legend>
												<div class="token_balance_amount_wrapper">
													<div class="token_balance_header">
														Your current SurgeFund BNB balance
													</div>
													<div class="token_balance_amount">
														{data.balance}
													</div>
												</div>
												<div class="token_balance_amount_wrapper">
													<div class="token_balance_header">
														BNB you have left to claim
													</div>
													<div class="token_balance_amount">
														{data.bnb_to_claim}
													</div>
												</div>
												<div class="token_balance_amount_wrapper">
													<div class="token_balance_header">
														Can Make A Claim?
													</div>
													<div class="token_balance_amount">
														{data.can_make_claim}
													</div>
												</div>
											</fieldset>
										</div>
									);
								})}
								<p id="token_balance_disclaimer">*Data provided by BSC and CoinGecko API's</p>
							</div>
						}
					</div>
				</Col>
				<Col xs={12} sm={12} md={12} lg={6} xl={6} className="edText">
					<p>The SurgeFund is XSurge's attempt to pay back the money that was lost in the SurgeBNB hack occurring on August 16th, 2021. Shortly after notifying the community to pull out of the contract due to a security vulnerability, SurgeBNB was exploited for $5M in BNB. The leadership team and Mark conducted a thorough investigation to determine the culprit and follow the money trail. Authorities were notified by a legal representative of the XSurge team and outside agencies were were hired to help. Unfortunately, the money could not be tracked and recovered. Mark and the team put together a Charitable Donation Fund for everyone who lost the money known as the SurgeFund shortly after.</p>
					<p>To learn more about the SurgeBNB hack, The SurgeFund and how to claim, please visit our Surge Education Page</p>
					<Button className="dApp btnDApp learn_more surge_fund_learn_more_button">
						<a href="#/education">Surge Education</a>
					</Button>
				</Col>
			</Row>
			<Footer/>
		</div>
	);
};

export default SurgeFund