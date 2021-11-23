import React from "react";

import NavBar from "../components/NavBar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import VST from "../components/VST";
import VSF from "../components/VSF";


//Functional Component 
class MainPage extends React.Component{

    
    render(){
        return (
            <div>
                
                
                
                <NavBar/>
    
                    <Row className="spacer1">
                        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mx-auto">
						<div id="intro_container">
                            <p className="intro">
                                The Surge tokens<br/>
                                <span className="herospan"><em>*never go down</em></span><br/>
                                given its protocol.
                            </p>
							<p id="intro_disclaimer">*Surge Tokens never go down <br/> when compared to its value in its base asset</p>
                            <br/>

                            <Button className="dApp btnDApp">
                            <img
                            alt=""
                            src="assets/img/appicon.png"
                            className="d-inline-block align-middle appicon"
                            /><a target="_blank" rel="noreferrer" href="https://app.xsurge.net/">Go to App</a>
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
                                its underlying asset. <span className="herospan">That means Buys, Transfers, and Sells raise the<br/>price.  That's the Surge protocol.</span>
                            </p>
                        </Col>
                    </Row>
                    <Row className="spacer1 text-center">
                        <Col>
                            <Image src="assets/img/atom.svg" className="atomImg" fluid />    
                        </Col>
                    </Row>
                    <Row className="spacer5 text-center">
                        <Col>
							<div id="cta_fees_container">
								<div className="fees">
									Surge is the first of it's type that only<br/>
									<span className="herospan">allows growth</span>, even in a bearish market.<br/>
									With low fees such as <span className="herospan">6% to buy, 6% to sell &<br/> 2% for wallet-to-wallet transfers</span>
								</div>
								<div className="feeBtns">
									<Button className="dApp3 btnDApp2">
									<img
									alt=""
									src="assets/img/appicon.png"
									className="d-inline-block align-middle appicon"
									/><a target="_blank" rel="noreferrer" href="https://app.xsurge.net/">Go to App</a>
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
                            <Image src="assets/img/App 1.png" className="app1Img" fluid />     
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
                            <h1 className="heroH1">Surge Certified<br/>by Certik.</h1>
                        </Col>
                        <Col xs={12} sm={12} md={7} lg={7} xl={7} className="app1_image app1_image_right">
                            <Image src="assets/img/certik.svg" className="certikImg" fluid />     
                        </Col>
                    </Row>

                    <Row className="spacervs">
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
                    
                
                </div>
        );
    };    
    }
    

export default MainPage;