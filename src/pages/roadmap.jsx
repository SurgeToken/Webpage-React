import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const RoadMap = () => {
	return (
		<div>
			<NavBar/>
			<Row>
				<Col xs={12} sm={12} md={12} lg={12} xl={12} id="surge-roadmap-container">
					<Image src="assets/img/xsurge-roadmap.png" id="surge-roadmap-img" />
				</Col>
			</Row>
			<Footer/>
		</div>
	);
};

export default RoadMap