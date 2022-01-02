import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
//import { Component } from 'react';
//import { HashLink, NavHashLink } from 'react-router-hash-link';
import Link from 'next/link';
import Image from 'react-bootstrap/Image';

class NavBar extends Component {
    render(){
        return (
            <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark">
                    <div className="LinkContainer" href="/">
                        <Navbar.Brand href="/">
                            <img
                            alt=""
                            src="assets/img/xsurgenew.png"
                            className="d-inline-block align-top logoNav1"
                            />
                        </Navbar.Brand>
                    </div>
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="justify-content-end" style={{ width: "100%" }}>
                            <Link className="nav-link" href="/#surge-assets">Surge Assets</Link>
							<Link className="nav-link" href="/#how-to-buy">How To Buy</Link>
							<NavDropdown title="Tools" id="basic-nav-dropdown">
                                <Link className="nav-link" href="/#surge-balance-checker">Balance Checker</Link>
                            </NavDropdown>
							<div className="LinkContainer" href="/surgefund">
                                <Nav.Link>Surge Fund</Nav.Link>
                            </div>
							<div className="LinkContainer" href="/education">
                                <Nav.Link>Surge Education</Nav.Link>
                            </div>
                            <Nav.Link href="https://xsurgemerch.com/">Store</Nav.Link>
							
							<NavDropdown title="About" id="basic-nav-dropdown">
                                <NavDropdown.Item target="_blank" href="assets/xsurge-whitepaper.pdf">Whitepaper</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#/onesheet">One Sheet</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#/roadmap">Road Map</NavDropdown.Item>
                            </NavDropdown>

							<div className="LinkContainer" href="/updates">
                                <Nav.Link>Updates</Nav.Link>
                            </div>

							{/* <Nav.Link target="_blank" href="assets/xsurge-whitepaper.pdf">Whitepaper</Nav.Link>
							<div className="LinkContainer" href="/onesheet">
                                <Nav.Link>One Sheet</Nav.Link>
                            </div>
							<div className="LinkContainer" href="/roadmap">
                                <Nav.Link>Road Map</Nav.Link>
                            </div>
                           </div>*/}

                            <Nav.Link className="dApp" href="https://app.xsurge.net">
                            <img
                            alt=""
                            src="assets/img/appicon.png"
                            className="d-inline-block align-middle appicon"
                            />Go to dApp</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    
            </Navbar>
        )
    }
    
}

export default NavBar;