import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Component } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import { HashLink, NavHashLink } from 'react-router-hash-link';

class NavBar extends Component{
    render(){
        return (
            <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark">
                    <LinkContainer to="/">
                        <Navbar.Brand to="/">
                            <img
                            alt=""
                            src="assets/img/xsurgenew.png"
                            className="d-inline-block align-top logoNav1"
                            />
                        </Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="justify-content-end" style={{ width: "100%" }}>
                            <HashLink className="nav-link" to="/#surge-assets">Surge Assets</HashLink>
							<HashLink className="nav-link" to="/#how-to-buy">How To Buy</HashLink>
							<NavDropdown title="Tools" id="basic-nav-dropdown">
                                <NavHashLink className="nav-link" to="/#surge-balance-checker">Balance Checker</NavHashLink>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#/my-holdings">My Holdings</NavDropdown.Item>
                            </NavDropdown>
							<LinkContainer to="/surgefund">
                                <Nav.Link>Surge Fund</Nav.Link>
                            </LinkContainer>
							<LinkContainer to="/education">
                                <Nav.Link>Surge Education</Nav.Link>
                            </LinkContainer>
                            <Nav.Link href="https://xsurgemerch.com/">Store</Nav.Link>
							
							<NavDropdown title="About" id="basic-nav-dropdown">
                                <NavDropdown.Item target="_blank" href="assets/xsurge-whitepaper.pdf">Whitepaper</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#/onesheet">One Sheet</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#/roadmap">Road Map</NavDropdown.Item>
                            </NavDropdown>

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