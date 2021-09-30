import React from "react";


import Card from "../components/Card"
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Token from "../components/Token";
import TokenResults from "../components/TokenResults";
import TokenStat from "../components/TokenStat";
import WalletResults from "../components/WalletResults";
import WidgetData from "../components/WidgetData";
import WidgetIntro from "../components/WidgetIntro";
import { Link } from "react-router-dom";

//Functional Component 
const MainPage = () => {


    return (
        <div>
            
            <div className="container">
            
            <NavBar/>
            
            <WidgetIntro/>
            
            {/* Countdown */}
            <Card>
                <WidgetData>
                <div className="coming-soon-cont">
                        <img className="sWordmark spacer4" src="assets/img/SURGEADAWhite.png" alt="SurgeADA" />
                        <div className="spacer4">
                            <div id="timer">
                                <div className="days"><span className="count">--</span> <span className="text">Days</span></div>
                                <div className="hours"><span className="count">--</span> <span className="text">Hours</span></div>
                                <div className="min"><span className="count">--</span> <span className="text">Mins</span></div>
                                <div className="sec"><span className="count">--</span> <span className="text">Secs</span></div>
                            </div> 
                        </div>
                    </div>
                </WidgetData>
            </Card>
    
            {/* How It Works */}
            <Card>
                <WidgetData>
                <h3>How Surge is different</h3>
                <h5>No Liquidity Pool & No Exchanges.</h5>
                <hr/>
                <h3>How it works</h3>
                <h5>Each transaction triggers a fee that raises the price of Surge relative to its underlying asset. That means Buys, Transfers, and Sells raise the price.</h5>
                <hr/>
                <h3>How about the fees?</h3>
                <h5>6% fee to buy, 6% fee to sell, 7% fee to navigate between tokens (i.e., SETH to SBTC) & 2% fee for wallet-to-wallet transfers</h5>
                <hr/>
                <h3>xSurge Whitepaper</h3>
                <h5>The xSurge Whitepaper will be available soon</h5>
                </WidgetData>
            </Card>
            
            {/* How To Buy */}
            <Card>
                <WidgetData>
                <em><h3>Here's how to buy:</h3></em>
                <h5>Buy BNB & Convert to BSC</h5>
                <p>BNB (Binance Coin) is available on all major exchanges, then convert your BNB to Binance Smart Chain (BSC)</p>
                <hr/>
                <h5>Send BSC to Surge Address</h5>
                <p>Send your BSC to the Surge Contract Address of your choice.</p>
                <hr/>
                <h5>Add Surge as custom token to your wallet</h5>
                <p>Add the Surge Contract Address, choose Network: Smart Chain</p><br/>
                <div className="dApp text-center">
                    <a href="https://app.xsurge.net">Trade Now</a>
                    </div>
                
                </WidgetData>
            </Card>
            
            {/* Token Stats/Balances */}
            <Card>
                <WidgetData>
                <h3 className="">Token Statistics</h3>
                            <TokenStat img="assets/img/SURGEUSDWhite.png" tokenPrice="sUSDPrice" tokenHolderCount="sUSDHolders" />
                            <TokenStat img="assets/img/SURGEETHWhite.png" tokenPrice="sETHPrice" tokenHolderCount="sETHHolders" />
                            <TokenStat img="assets/img/SURGEBTCWhite.png" tokenPrice="sBTCPrice" tokenHolderCount="sBTCHolders" />
                            
                            <hr/>
                            <div className="row spacer4">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <div className="form-group">
                                        <select className="form-select surgeSelect" aria-label="Token Select" id="userSelect">
                                            <option defaultValue="noToken">Choose an Option</option>
                                                <option value="wallet">Wallet Address</option>
                                                <option value="sUSD">SurgeUSD</option>
                                                <option value="sETH">SurgeETH</option>
                                                <option value="sBTC">SurgeBTC</option>
                                                {/* <option value="sADA">SurgeADA</option> */}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                    <div className="input-group mb-3 ">
                                        <input type="text" className="form-control surgeAmount surgeInput" placeholder="Choose an option" aria-label="Wallet Address" aria-describedby="basic-addon1" id="userInput"/>
                                    </div>
                                    <div className="float-end">
                                        <button className="calcBtn" id="calcBtn">Show</button>
                                    </div>
                                </div>
                                
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 resultsSpacer" id="calcResults">
                                    
                                    {/* Results for Wallet Address */}
                                    <WalletResults/>
    
                                    {/* Results per Token */}
                                    <TokenResults/>
    
                                </div>
                                
                            </div>
                </WidgetData>
            </Card>
            
            {/* Token Addresses */}
            <Card>
                <WidgetData>
                <em><h3>Find your favorite <strong>Token</strong> contract address here:</h3></em>
                    <Token img="assets/img/SURGEUSDWhite.png" tokenName="SurgeUSD" tokenAddress="0x14fEe7d23233AC941ADd278c123989b86eA7e1fF" />
                    <hr/>
                    <Token img="assets/img/SURGEETHWhite.png" tokenName="SurgeETH" tokenAddress="0x5B1d1BBDCc432213F83b15214B93Dc24D31855Ef" />
                    <hr/>
                    <Token img="assets/img/SURGEBTCWhite.png" tokenName="SurgeBTC" tokenAddress="0xb68c9D9BD82BdF4EeEcB22CAa7F3Ab94393108a1" />
                </WidgetData>
            </Card>
            
            {/* Holder */}
            <Card className="holderDiv"/>
    
            {/* xToken Addresses */}
            <Card>
                <WidgetData>
                <em><h3>Find your favorite <strong>xToken</strong> contract address here:</h3></em>
                <p>Relaunch Coming Soon</p>
                </WidgetData>
            </Card>
    
            <Footer/>
    
            {/* CopyMSG */}
            <div className="centerpoint widgetMsg" id="copyMSG" >
                    <div className="dialog" id="dialog"/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;