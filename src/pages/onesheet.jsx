import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const OneSheet = () => {
	return (
		<div>
			<NavBar/>
			<Row>
				<Col xs={12} sm={12} md={12} lg={12} xl={12} id="surge-one-sheet-container">
					<Image src="assets/img/xsurge-onesheet.jpeg" id="surge-one-sheet-img" />
				</Col>
			</Row>
			<Footer/>
		</div>
	);
};

export default OneSheet