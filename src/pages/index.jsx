import React from "react";

import NavBar from "../components/NavBar";
import VS from "../components/VS";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';



//Functional Component 
const MainPage = () => {


    return (
        <div>
            
            
            
            <NavBar/>

                <Row className="spacer1">
                    <Col xs={12} sm={12} md={4} lg={4} xl={4} className="mx-auto">
                        <p className="intro">
                            The Surge tokens<br/>
                            <span className="herospan"><em>*never go down*</em></span><br/>
                            given its protocol.
                        </p>
                        <br/>
                        <Button className="dApp btnDApp">
                        <img
                        alt=""
                        src="assets/img/appicon.png"
                        className="d-inline-block align-middle appicon"
                        />Go to App
                        </Button>
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={8} xl={8} >
                        <Image src="assets/img/shapehero.png" className="heroImage" fluid />    
                    </Col>
                </Row>
                <Row className="spacer1 text-center">
                    <Col>
                    <p className="hiw">
                            Each transaction triggers a fee that raises the price of Surge relative to<br/>
                            its underlying asset.<span className="herospan">That means Buys, Transfers, and Sells raise the<br/>price.  That's the Surge protocol.</span>
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
                        <Image src="assets/img/cta.svg" className="cta" fluid />
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
                                />Get Started
                                </Button>
                                <Button className="dApp2">
                                <img
                                alt=""
                                src="assets/img/paper.png"
                                className="d-inline-block align-middle papericon"
                                />Whitepaper
                                </Button>
                            </div>
                    </Col>
                </Row>
                
                <Row className="spacer2 text-center">
                    <Col xs={12} sm={12} md={5} lg={5} xl={5} className="app1">
                        <span className="herospan1">Core Features</span>
                        <br/>
                        <h1 className="heroH1">Five tokens for you to<br/>invest and start<br/>earning.</h1>
                    </Col>
                    <Col xs={12} sm={12} md={7} lg={7} xl={7} >
                        <Image src="assets/img/App 1.png" className="app1Img" fluid />     
                    </Col>
                </Row>
                
                <Row className="spacer3 text-center">
                    <Col xs={12} sm={12} md={7} lg={7} xl={7} >
                        <Image src="assets/img/App 2.png" className="app2Img" fluid />     
                    </Col>
                    <Col xs={12} sm={12} md={5} lg={5} xl={5} className="app2">
                        <span className="herospan2">Core Features</span>
                        <br/>
                        <h1 className="heroH2">No Liquidity Pool & No Exchanges.</h1>
                    </Col>
                    
                </Row>

                <Row className="">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                        <Image src="assets/img/shape.png" className="shape" />     
                    </Col>
                </Row>

                <Row className="spacer4 text-center">
                    <Col xs={12} sm={12} md={5} lg={5} xl={5} className="app1">
                        <span className="herospan1">Certified</span>
                        <br/>
                        <h1 className="heroH1">Surge Certified<br/>by Certik.</h1>
                    </Col>
                    <Col xs={12} sm={12} md={7} lg={7} xl={7} >
                        <Image src="assets/img/certik.svg" className="certikImg" fluid />     
                    </Col>
                </Row>
                <Row className="spacervs">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="app1 text-center">
                        <span className="herospan1 ">Statistics</span>
                        <br/>
                        <h4 className="heroH1 text-center">Values Statistics</h4>
                        <Image src="assets/img/shape2.png" className="shape2" fluid />
                        
                    </Col>
                </Row>
                <VS/>
                
            
            </div>
    );
};

export default MainPage;