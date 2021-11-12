import React from 'react';
import TokenStats from './TokenStats';
import SUSDJSON from './json/surge_usd_abi.json';
import SETHJSON from './json/surge_eth_abi.json';
import SBTCJSON from './json/surge_btc_abi.json';
import SADAJSON from './json/surge_ada_abi.json';
import SUSLSJSON from './json/surge_useless_abi.json';
import XUSDJSON from './json/surge_xusd_abi.json';
import Web3 from 'web3';
import {useState, useEffect} from 'react';

const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const tokens = [
	{
			'address': '0x14fEe7d23233AC941ADd278c123989b86eA7e1fF',
			'abi': SUSDJSON,
			'name': 'SurgeUSD',
			'symbol': 'sUSD'
		},
		{
			'address': '0x5B1d1BBDCc432213F83b15214B93Dc24D31855Ef',
			'abi': SETHJSON,
			'name': 'SurgeETH',
			'symbol': 'sETH'
		},
		{
			'address': '0xb68c9D9BD82BdF4EeEcB22CAa7F3Ab94393108a1',
			'abi': SBTCJSON,
			'name': 'SurgeBTC',
			'symbol': 'sBTC'
		},
		{
			'address': '0xbF6bB9b8004942DFb3C1cDE3Cb950AF78ab8A5AF',
			'abi': SADAJSON,
			'name': 'SurgeADA',
			'symbol': 'sADA'
		},
		{
			'address': '0x2e62e57d1D36517D4b0F329490AC1b78139967C0',
			'abi': SUSLSJSON,
			'name': 'SurgeUSELESS',
			'symbol': 'sUSLS'
		},
		{
			'address': '0x254246331cacbC0b2ea12bEF6632E4C6075f60e2',
			'abi': XUSDJSON,
			'name': 'xUSD',
			'symbol': 'xUSD'
		}
	]

const redis = require('redis');
const client = redis.createClient({
	host: 'redis',
	port: 6793
});


	export default function VSTokens() {

		client.on('error', err => {
			console.log('Error' + err);
		});

		client.get('susd_holders', (err, reply) => {
			if(err) throw err;
			console.log(reply);
		});

		const [tokenComponents, setTokenComponents] = useState([]);
	
		
		const getTokenPrice = async (tokenABI, tokenAddress) => {
			const contract = new web3.eth.Contract(tokenABI, tokenAddress);
			const priceRaw = await contract.methods.calculatePrice().call();
			const price = web3.utils.fromWei(priceRaw, 'ether');
			return price;
		}
	
		const getTokenStats = (tokenConfig) => {
			const promiseArray = tokenConfig.map(async (token) => {
				const tokenPrice = await getTokenPrice(token.abi, token.address);
				const tokenStats = {
					name: token.name,
					symbol: token.symbol,
					address: token.address,
					price: tokenPrice
				}
				return tokenStats;
			})
			Promise.all(promiseArray).then(results => {
				setTokenComponents(results);
			})
		}
	
		useEffect(() => {
			getTokenStats(tokens);
		}, [tokens]);
			
		return (
				<div className="widget spacerToken tokenList">
					
					{tokenComponents.map((token, index) => {
						return (
							<TokenStats
								key={index}
								tokenName = {token.name}
								tokenAddress = {token.address}
								tokenPrice = {token.price}
								tokenSymbol = {token.symbol}
							/>
						)
					})}
				</div>
			)
	
		
	}