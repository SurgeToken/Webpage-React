import React from 'react';
import Form from 'react-bootstrap/Form'
import { FaRegCopy, FaCheck } from "react-icons/fa";
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
        'uassetaddress': '0xe9e7cea3dedca5984780bafc599bd69add087d56',
		'wei_unit': 'ether',
		'fees': {
			'buy': 6,
			'sell': 6,
			'transfer': 2
		}
	},
	{
		'address': '0x5B1d1BBDCc432213F83b15214B93Dc24D31855Ef',
		'abi': SETHJSON,
		'name': 'SurgeETH',
		'symbol': 'sETH',
        'uassetname': 'Binance-Pegged ETH',
        'uassetsymbol': 'BETH',
        'uassetaddress': '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
		'wei_unit': 'ether',
		'fees': {
			'buy': 6,
			'sell': 6,
			'transfer': 2
		}
	},
	{
		'address': '0xb68c9D9BD82BdF4EeEcB22CAa7F3Ab94393108a1',
		'abi': SBTCJSON,
		'name': 'SurgeBTC',
		'symbol': 'sBTC',
        'uassetname': 'Binance-Pegged BTC',
        'uassetsymbol': 'BBTC',
        'uassetaddress': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
		'wei_unit': 'ether',
		'fees': {
			'buy': 6,
			'sell': 6,
			'transfer': 3
		}
	},
	{
		'address': '0xbF6bB9b8004942DFb3C1cDE3Cb950AF78ab8A5AF',
		'abi': SADAJSON,
		'name': 'SurgeADA',
		'symbol': 'sADA',
        'uassetname': 'Binance-Pegged ADA',
        'uassetsymbol': 'BADA',
        'uassetaddress': '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
		'wei_unit': 'ether',
		'fees': {
			'buy': 4,
			'sell': 4,
			'transfer': 2
		}
	},
	{
		'address': '0x2e62e57d1D36517D4b0F329490AC1b78139967C0',
		'abi': SUSLSJSON,
		'name': 'SurgeUSELESS',
		'symbol': 'sUSLS',
        'uassetname': 'Useless',
        'uassetsymbol': 'USLS',
        'uassetaddress': '0x2cd2664ce5639e46c6a3125257361e01d0213657',
		'wei_unit': 'gwei',
		'fees': {
			'buy': 8,
			'sell': 8,
			'transfer': 4
		}
	},
	{
		'address': '0x254246331cacbC0b2ea12bEF6632E4C6075f60e2',
		'abi': XUSDJSON,
		'name': 'xUSD',
		'symbol': 'xUSD',
        'uassetname': 'Binance-Pegged USD',
        'uassetsymbol': 'BUSD',
        'uassetaddress': '0xe9e7cea3dedca5984780bafc599bd69add087d56',
		'wei_unit': 'ether',
		'fees': {
			'buy': .75,
			'sell': .25,
			'transfer': .25
		}
	}
]



export default function VST() {

    /*get token info*/
    const [selectedToken, setSelectedToken] = useState(tokens[0]);
    const [selectedTokenByUser, setSelectedTokenByUser] = useState(false);
    
    const tokenChange = (e) => {

        setSelectedTokenByUser(true);
        let tokenSymbol = e.target.value;
        if(tokenSymbol === "0"){
            setSelectedTokenByUser(false); return
        } else {
            const tokenData = tokens.filter(token => token.symbol === tokenSymbol)[0];

            setSelectedToken(tokenData);
        }
        
    }

    const getTokenPrice = async (tokenABI, tokenAddress, weiUnit) => {
        const contract = new web3.eth.Contract(tokenABI, tokenAddress);
        const priceRaw = await contract.methods.calculatePrice().call();
        const price = web3.utils.fromWei(priceRaw, weiUnit);
        return price;
    }

    const getTokenStats = (tokenConfig) => {
        const promiseArray = tokenConfig.map(async (token) => {
            const tokenPrice = await getTokenPrice(token.abi, token.address, token.wei_unit);
            const tokenStats = {
                name: token.name,
                symbol: token.symbol,
                address: token.address,
                bsc: token.bsc,
                price: tokenPrice
            }
            return tokenStats;
        })
        Promise.all(promiseArray).then(results => {
            // setTokenComponents(results);
            results.forEach(result=>{
                tokens.forEach(token=>{
                    
                    if(result.symbol === token.symbol) {
                        token.price = result.price;
                    }
                })
                if(result.symbol === selectedToken.symbol) {
                    selectedToken.price = result.price;
                    setSelectedToken(result)
                }
            })
        })
    }

    useEffect(() => {
        getTokenStats(tokens);
    }, [tokens]);

    const addressCopy = function(address) {

        // Copy to clipboard
        navigator.clipboard.writeText(address);

        // "Copied" animation
        let icon1 = document.querySelector("#copy-icon-address");
        let icon2 = document.querySelector("#copy-icon-okay-address");
        icon1.classList.add("hidden");
        icon2.classList.remove("hidden"); 
        
        setTimeout(()=>{
            icon2.classList.add("hidden");
            icon1.classList.remove("hidden"); 
        }, 2000);
    }

    const uaddressCopy = function(address) {

        // Copy to clipboard
        navigator.clipboard.writeText(address);

        // "Copied" animation
        let icon1 = document.querySelector("#copy-icon-uaddress");
        let icon2 = document.querySelector("#copy-icon-okay-uaddress");
        icon1.classList.add("hidden");
        icon2.classList.remove("hidden"); 
        
        setTimeout(()=>{
            icon2.classList.add("hidden");
            icon1.classList.remove("hidden"); 
        }, 2000);
    }
    
    

    return (
            <div className="widget spacerToken tokenList2">
                <Form.Select className="tokenSelect" onChange={(ev) => tokenChange(ev)}>
                    <option value="0" defaultValue>Select a Token</option>
                    {tokens.map((token) => {
                        return (
                            <option key={token.symbol} value={token.symbol}>{token.name}</option>
                        );

                    })}
                </Form.Select>
            
              {!selectedTokenByUser?"":
            
                <div className="tokenData">
                    <div className="cValueSpacer">
                        <Image src="assets/img/dot.png" className="dot" fluid /> <span className="cValueTxt">Current <span className="herospan"> value:</span></span>
                    </div>
                
                    <table className="table table-borderless tokenStatsTable" cellSpacing="0">
                        <tbody>
                            <tr>
                                <td colSpan="3" className="coloredTD">
                                    <div className="tdLabel tdPrice">Price</div>
                                    <div className="tdData tdPriceData">{selectedToken.price}</div>
                                </td>
                            </tr>
                            <tr><td colSpan="3">&nbsp;</td></tr>
                            <tr>
                                <td colSpan="3" className="coloredTD">
                                    <div className="tdLabel">Contract Address</div>
                                    <div className="tooltip">Copied</div>
                                    <div className="tdData"><FaRegCopy id="copy-icon-address" onClick={() => addressCopy(selectedToken.address)}/>
                                    <FaCheck id="copy-icon-okay-address" className="hidden" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="cAddressData">
									{selectedToken.address}
                                </td>
                            </tr>
                            <tr><td colSpan="3">&nbsp;</td></tr>
							<tr>
                                <td colSpan="3" className="">
                                    <div className="uLabel">Fees</div>
                                </td>
                            </tr>
							<tr>
								<td className="tdFee tdFeeFirst">
									<div className="coloredTD tdFeeContainer">
										<div className="tdLabel tdFeeLabel">Buy</div>
										<div className="tdData tdFeeData">{selectedToken.fees['buy']}%</div>
										<div className="clear"></div>
									</div>
								</td>
								<td className="tdFee">
									<div className="coloredTD tdFeeContainer">
										<div className="tdLabel tdFeeLabel">Sell</div>
										<div className="tdData tdFeeData">{selectedToken.fees['sell']}%</div>
										<div className="clear"></div>
									</div>
								</td>
								<td className="tdFee tdFeeLast">
									<div className="coloredTD tdFeeContainer">
										<div className="tdLabel tdFeeLabel">Transfer</div>
										<div className="tdData tdFeeData">{selectedToken.fees['transfer']}%</div>
										<div className="clear"></div>
									</div>
								</td>
							</tr>
							<tr><td colSpan="3">&nbsp;</td></tr>
                            <tr>
                                <td colSpan="3" className="">
                                    <div className="uLabel">Underlying Asset</div>
                                </td>
							</tr>
                            <tr>
                                <td colSpan="3" className="coloredTD">
                                    <div className="tdLabel tdUnderlyingAsset">{selectedToken.uassetname} ({selectedToken.uassetsymbol})</div>
                                    <div className="tdData"><FaRegCopy id="copy-icon-uaddress" onClick={() => uaddressCopy(selectedToken.uassetaddress)}/>
                                    <FaCheck id="copy-icon-okay-uaddress" className="hidden" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="cAddressData">
									{selectedToken.uassetaddress}
                                </td>
                            </tr>
                        </tbody>
                    </table>
           
                </div>
            } 
            </div>
        )

    
    }