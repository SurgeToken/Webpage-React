import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { HashLink } from 'react-router-hash-link';
import {LinkContainer} from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav'
import VST from "../components/VST";
import VSF from "../components/VSF";
import TokenBalanceChecker from "../components/TokenBalanceChecker";
import FarmBalanceChecker from "../components/FarmBalanceChecker";

/* Functionals for scrolling */
function checkWantToScrollToHowToBuy() {
    return window.location.hash.indexOf("how-to-buy")!==-1; // True means want to scroll
}
function scrollToHowToBuy() {
    let elHowToBuy = document.getElementById('how-to-buy');
    if(elHowToBuy)
        elHowToBuy.scrollIntoView({block: 'start', behavior: 'smooth'});
}

/* React app likes to change link to /#/ then useLayoutEffect and useEffect no longer runs
   if you visit http://localhost:3000/#/#how-to-buy if already on the page
   or if you visit http://localhost:3000/#/how-to-buy if already on the page
    Solution: Check popstate
*/
window.addEventListener('popstate', ()=>{
    console.log("popstate")
    if(checkWantToScrollToHowToBuy())
        scrollToHowToBuy();
});
/* React app will not check hash properly for scrolling
   if you visit directly http://localhost:3000/#/#how-to-buy on a fresh tab
   or if you visit directly http://localhost:3000/#/how-to-buy on a fresh tab
    Solution: Check onload, and wait for render to complete outside of React
*/
window.addEventListener('load', ()=>{
    console.log("load")
    if(checkWantToScrollToHowToBuy()) {
        var pollCheckLimit = 9;
        var pollCurrent = 0;

        var poller = setInterval(()=>{
            var hasLoadedHowToBuy = document.getElementById("how-to-buy");
            if(hasLoadedHowToBuy) {
                scrollToHowToBuy();
            }

            if(pollCurrent>pollCheckLimit)
                clearInterval(poller);
                pollCurrent++;
        }, 300)
    }
});

//Functional Component 
class MainPage extends React.Component{
    useLayoutEffect() {
        console.log("HELLO");
        /* Check if #how-to-buy is in URL; If yes, scroll to section with id "how-to-buy"
        if you visit http://localhost:3000/#how-to-buy from a fresh tab */
        if(checkWantToScrollToHowToBuy())
            scrollToHowToBuy();
    }
    render() {
        return (
            <div>
                <NavBar/>
                    <Row className="spacer1">
                        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mx-auto">
						<div id="intro_container">
                            <div className="intro_hero_wrapper">
								<span class="intro_hero_header">&bull; Compounded Earnings</span>
								<span class="intro_hero_header">&bull; Internal LP Market Maker</span>
								<span class="intro_hero_header">&bull; Over 100% Backed MC</span>
								<span class="intro_hero_header">&bull; No Developer Tokens</span>
								<img alt="" src="assets/img/surge_slim.png" className="intro_hero_img"/>
								<span className="special bottom intro_hero_header">"never goes down<span class="hero_copyright">©</span>"</span>
                            </div>
                            <br/>
                            <Button className="dApp btnDApp">
								<img
									alt=""
									src="assets/img/appicon.png"
									className="d-inline-block align-middle appicon"/>
								<a target="_blank" rel="noreferrer" href="https://app.xsurge.net/">Go to dApp</a>
                            </Button>
							<Button className="dApp btnDApp learn_more">
									<a href="#/education">Learn More</a>
                            </Button>
							<br/>
							<Button className="dApp btnDApp how_to_buy_hero">
								<a href="#" onClick={ev=>{ev.preventDefault(); scrollToHowToBuy()}} className="nav-link">How To Buy</a>
                            </Button>
						</div>
                        </Col>
                        <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                            <Image src="assets/img/shapehero.png" className="heroImage" fluid />    
                        </Col>
                    </Row>
                    <Row className="spacer1 text-center">
                        <Col>
                        <p className="hiw">
                                Each transaction triggers a fee that raises the price of Surge relative to<br/>
                                its underlying asset. That means Buys, Transfers, and Sells raise the<br/>price.  <span className="herospan">That's the Surge protocol.</span>
                            </p>
                        </Col>
                    </Row>
                    <Row className="spacer1 text-center">
                        <Col>
                            <Image src="assets/img/atom.png" className="atomImg" fluid />    
                        </Col>
                    </Row>
                    <Row className="spacer5 text-center">
                        <Col>
							<div id="cta_fees_container">
								<div className="fees">
									Surge is the first of it's kind that only<br/>
									<span className="herospan">allows for growth</span>. The tokens use very low fees<br/>
									to raise the price floor with every transaction, whether<br/>
                                    it be buys, sells, or wallet-to-wallet transfers.
								</div>
								<div className="feeBtns">
									<Button className="dApp3 btnDApp2">
									<img
									alt=""
									src="assets/img/appicon.png"
									className="d-inline-block align-middle appicon"
									/><a target="_blank" rel="noreferrer" href="https://app.xsurge.net/">Go to dApp</a>
									</Button>
									<Button className="dApp2">
									<img
									alt=""
									src="assets/img/paper.png"
									className="d-inline-block align-middle papericon"
									/>
									<a target="_blank" rel="noreferrer" href="assets/xsurge-whitepaper.pdf">Whitepaper</a>
									</Button>
								</div>
							</div>
                        </Col>
                    </Row>
                    
                    <Row className="spacer2 text-center">
                        <Col xs={12} sm={12} md={5} lg={5} xl={5} className="app1">
                            <h6 className="heroh6">Core Features</h6>
                            <h1 className="heroH1">Six tokens for you to<br/>invest and start<br/>earning.</h1>
                        </Col>
                        <Col xs={12} sm={12} md={7} lg={7} xl={7} className="app1_image app1_image_right">
                            <Image src="assets/img/surge_tokens_horizontal.png" className="app1Img" fluid />     
                        </Col>
                    </Row>
                    
                    <Row className="spacer3 text-center">
                        <Col xs={12} sm={12} md={7} lg={7} xl={7} className="app1_image">
                            <Image src="assets/img/App 2.png" className="app2Img" fluid />     
                        </Col>
						<Col xs={12} sm={12} md={5} lg={5} xl={5} className="app1 app1_right">
							<h6 className="heroh6 heroh6_right">Core Features</h6>
							<h1 className="heroH1 heroH1_right">Internal Liquidity Pool & Market Maker.</h1>
						</Col>
                    </Row>
    
                    <Row className="spacer4 text-center">
                        <Col xs={12} sm={12} md={5} lg={5} xl={5} className="app1">
                            <h6 className="heroh6">Certified</h6>
                            <h1 className="heroH1">Certified<br/>by Certik.</h1>
							<Button className="certikAudtitBtn certikAudtitBtnFirst">
								<a href="https://www.certik.com/projects/surgeeth" target="_blank">SurgeETH</a>
                            </Button>
							<Button className="certikAudtitBtn">
								<a href="https://www.certik.com/projects/surgebtc" target="_blank">SurgeBTC</a>
                            </Button>
                            <Button className="certikAudtitBtn">
								<a href="https://www.certik.com/projects/xusd" target="_blank">xUSD - Onboarding</a>
                            </Button>
                            <Button className="certikAudtitBtn">
								<a href="https://www.certik.com/projects/surgeuseless" target="_blank">SurgeUseless - Onboarding</a>
                            </Button>
                        </Col>
                        <Col xs={12} sm={12} md={7} lg={7} xl={7} className="app1_image app1_image_right">
                            <Image src="assets/img/certik.svg" className="certikImg" fluid />     
                        </Col>
                    </Row>

					<Row className="spacervs">
                        <Col xs={12} className="text-center">
                            <h4 className="heroH1 text-center" id="how-to-buy">How To Buy</h4>
							<p class="how_to_buy">
								<span className="herospan">XUSD and all Surge Tokens/Farms 
								<br />can be purchased through our dApp</span>
							</p>
							<button type="button" class="how_to_buy_dApp dApp btnDApp btn btn-primary">
								<img alt="" src="assets/img/appicon.png" class="d-inline-block align-middle appicon" />
								<a target="_blank" rel="noreferrer" href="https://app.xsurge.net/">Go to dApp</a>
							</button>
							<p class="how_to_buy">
								<span className="herospan">or by following these steps:</span>
							</p>
							<ol id="how_to_buy_list_container">
								<li>Select a Surge Token/Farm <br /> from the dropdowns below</li>
								<li>Copy the contract address</li>
								<li>Send SmartChain BNB to <br /> the contract address</li>
								<li>Add contract to your wallet</li>
							</ol>
                        </Col>
                    </Row>

                    <Row id="surge_assets_row" className="spacervs">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="text-center">
                            <h4 className="heroH1 text-center" id="surge-assets">Surge Assets</h4>
                            <Image src="assets/img/shape2.png" className="shape2" fluid />
                            
                        </Col>
                    </Row>

                    <Row className="spacerToken">
                        <Col xs={12} sm={12} md={12} lg={6} xl={6} className="assetsLeftPanel ">
                            <VST />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6} xl={6} className="assetsRightPanel ">
                            <VSF />
                        </Col>
                    </Row>

					<Row className="spacervs">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="text-center">
                            <h4 className="heroH1 text-center" id="surge-balance-checker">Balance Checker</h4>
                            <Image src="assets/img/shape2.png" className="shape2" fluid />
                            
                        </Col>
                    </Row>

                    <Row className="spacerToken">
                        <Col xs={12} sm={12} md={12} lg={6} xl={6} className="assetsLeftPanel ">
                            <TokenBalanceChecker />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6} xl={6} className="assetsRightPanel ">
                            <FarmBalanceChecker />
                        </Col>
                    </Row>
                    
				<Footer/>
            </div>
        );
    };    
}
    

export default MainPage;
