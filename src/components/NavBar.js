import Navbar from 'react-bootstrap/Navbar'
import {Container} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'

function NavBar(){
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img
                    alt=""
                    src="assets/img/xsurgenew.png"
                    className="d-inline-block align-top logoNav1"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Nav.Link href="#documentation">Documentation</Nav.Link>
                        <Nav.Link href="https://xsurgemerch.com/">Store</Nav.Link>
                        <Nav.Link href="#community">Community</Nav.Link>
                        <Nav.Link href="#help">Help</Nav.Link>
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

export default NavBar;