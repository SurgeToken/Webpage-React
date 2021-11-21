import React from 'react';
import Form from 'react-bootstrap/Form'
import TokenData from './TokenData';
import { FaRegCopy } from "react-icons/fa";
import Image from 'react-bootstrap/Image';
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
		'symbol': 'sUSD',
        'uassetname': 'Binance-Pegged USD',
        'uassetsymbol': 'BUSD',
        'uassetaddress': '0xe9e7cea3dedca5984780bafc599bd69add087d56'
	},
	{
		'address': '0x5B1d1BBDCc432213F83b15214B93Dc24D31855Ef',
		'abi': SETHJSON,
		'name': 'SurgeETH',
		'symbol': 'sETH',
        'uassetname': 'Binance-Pegged ETH',
        'uassetsymbol': 'BETH',
        'uassetaddress': '0x2170ed0880ac9a755fd29b2688956bd959f933f8'
	},
	{
		'address': '0xb68c9D9BD82BdF4EeEcB22CAa7F3Ab94393108a1',
		'abi': SBTCJSON,
		'name': 'SurgeBTC',
		'symbol': 'sBTC',
        'uassetname': 'Binance-Pegged BTC',
        'uassetsymbol': 'BBTC',
        'uassetaddress': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'
	},
	{
		'address': '0xbF6bB9b8004942DFb3C1cDE3Cb950AF78ab8A5AF',
		'abi': SADAJSON,
		'name': 'SurgeADA',
		'symbol': 'sADA',
        'uassetname': 'Binance-Pegged ADA',
        'uassetsymbol': 'BADA',
        'uassetaddress': '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47'
	},
	{
		'address': '0x2e62e57d1D36517D4b0F329490AC1b78139967C0',
		'abi': SUSLSJSON,
		'name': 'SurgeUSELESS',
		'symbol': 'sUSLS',
        'uassetname': 'Useless',
        'uassetsymbol': 'USLS',
        'uassetaddress': '0x2cd2664ce5639e46c6a3125257361e01d0213657'
	},
	{
		'address': '0x254246331cacbC0b2ea12bEF6632E4C6075f60e2',
		'abi': XUSDJSON,
		'name': 'xUSD',
		'symbol': 'xUSD',
        'uassetname': 'Binance-Pegged USD',
        'uassetsymbol': 'BUSD',
        'uassetaddress': '0xe9e7cea3dedca5984780bafc599bd69add087d56'
	}
]



export default function VST() {

    const [selectedToken, setSelectedToken] = useState(tokens[0]);

    const tokenChange = (e) => {
        let tokenSymbol = e.target.value;
        console.log(tokenSymbol);
        const tokenData = tokens.filter(token => token.symbol === tokenSymbol);
        setSelectedToken(tokenData);
    }
    

    return (
            <div className="widget spacerToken tokenList2">
                <Form.Select className="tokenSelect" onChange={tokenChange}>
                    {tokens.map((token) => {
                        return (
                            <option value={token.symbol}>{token.name}</option>
                        );

                    })}
                </Form.Select>
                

                <div className="tokenData">
                    <div className="cValueSpacer">
                        <Image src="assets/img/dot.png" className="dot" fluid /> <span className="cValueTxt">Current <span className="herospan"> value:</span></span>
                    </div>
                
                    <table className="table table-borderless statsTable" cellSpacing="0">
                        <tbody>
                            <tr>
                                <td colSpan="5" className="coloredTD">
                                    <div className="tdLabel tdPrice">Price</div>
                                    <div className="tdData tdPriceData">price data</div>
                                </td>
                            </tr>
                           {/*  <tr>
                                <td colSpan="5" className="uncoloredTD">
                                    <div className="tdLabel">Holders</div>
                                    <div className="tdData">holder data</div>
                                </td>
                            </tr> */}
                            <tr><td>&nbsp;</td></tr>
                            <tr>
                                <td colSpan="5" className="coloredTD">
                                    <div className="tdLabel">Contract Address</div>
                                    <div className="tdData"><FaRegCopy onClick={() => {navigator.clipboard.writeText(selectedToken.address)}}
/></div>
                                </td>
                            </tr>
                            <tr>
                                <td className="cAddressData">
                                    {selectedToken.address}
                                </td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr>
                                <td className="">
                                    <div className="uLabel">Underlying Asset</div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="5" className="coloredTD">
                                    <div className="tdLabel">{selectedToken.uassetname} ({selectedToken.uassetsymbol})</div>
                                    <div className="tdData"><FaRegCopy onClick={() => {navigator.clipboard.writeText(selectedToken.uassetaddress)}}
/></div>
                                </td>
                            </tr>
                            <tr>
                                <td className="cAddressData">
                                    {selectedToken.uassetaddress}
                                </td>
                            </tr>
                        </tbody>
                    </table>
           
                </div>

            </div>
        )

    
    }