import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Component } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import { HashLink } from 'react-router-hash-link';
import Image from 'react-bootstrap/Image';

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
							<LinkContainer to="/education">
                                <Nav.Link>Surge Education</Nav.Link>
                            </LinkContainer>
                        
                            <Nav.Link href="https://xsurgemerch.com/">Store</Nav.Link>
                            <NavDropdown title="Community" id="basic-nav-dropdown">
                                <NavDropdown.Item href="https://discord.gg/XSURGE">
                                    <Image src="assets/img/discord.png" className="nav-image" />
                                    Discord
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="https://instagram.com/XSURGEDEFI">
                                <Image src="assets/img/instagram.png" className="nav-image" />
                                    Instagram
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="https://twitter.com/XSURGEDEFI">
                                <Image src="assets/img/twitter.png" className="nav-image" />
                                    Twitter
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="https://www.reddit.com/r/XSURGE">
                                <Image src="assets/img/reddit.png" className="nav-image" />
                                    Reddit
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="https://t.me/XSURGEDEFI">
                                <Image src="assets/img/telegram.png" className="nav-image" />
                                    Telegram
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="https://www.facebook.com/groups/XSURGEDEFI">
                                <Image src="assets/img/facebook.png" className="nav-image" />
                                    Facebook
                                </NavDropdown.Item>
                            </NavDropdown>
							<Nav.Link target="_blank" href="assets/xsurge-whitepaper.pdf">Whitepaper</Nav.Link>
							<LinkContainer to="/onesheet">
                                <Nav.Link>One Sheet</Nav.Link>
                            </LinkContainer>
                            <Nav.Link className="dApp" href="https://app.xsurge.net">
                            <img
                            alt=""
                            src="assets/img/appicon.png"
                            className="d-inline-block align-middle appicon"
                            />Go to App</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    
            </Navbar>
        )
    }
    
}

export default NavBar;