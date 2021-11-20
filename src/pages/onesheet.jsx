import React from "react";
import NavBar from "../components/NavBar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';

const OneSheet = () => {
	return (
		<div>
			<NavBar/>
			<Row>
				<Col xs={12} sm={12} md={12} lg={12} xl={12} id="surge-one-sheet-container">
					<Image src="assets/img/surge-one-sheet.png" id="surge-one-sheet-img" />
				</Col>
			</Row>
		</div>
	);
};

export default OneSheet