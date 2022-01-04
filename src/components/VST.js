import React from 'react';
import Form from 'react-bootstrap/Form'
import { FaRegCopy, FaCheck } from "react-icons/fa";
import Image from 'react-bootstrap/Image';
import Web3 from 'web3';
import {useState, useEffect} from 'react';
import {getSurgeTokensData} from './SurgeAssetData.js';

const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const tokens = getSurgeTokensData();

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
										<div className="tdLabel tdFeeLabel">Buy {selectedToken.fees['stake'] ? '/ Stake' : ''}</div>
									</div>
									<div className="tdData tdFeeData">{selectedToken.fees['buy']}% {selectedToken.fees['stake'] ? ' / '+selectedToken.fees['stake']+'%' : ''}</div>
								</td>
								<td className="tdFee">
									<div className="coloredTD tdFeeContainer">
										<div className="tdLabel tdFeeLabel">Sell</div>
									</div>
									<div className="tdData tdFeeData">{selectedToken.fees['sell']}%</div>
								</td>
								<td className="tdFee tdFeeLast">
									<div className="coloredTD tdFeeContainer">
										<div className="tdLabel tdFeeLabel">Transfer</div>
									</div>
									<div className="tdData tdFeeData">{selectedToken.fees['transfer']}%</div>
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