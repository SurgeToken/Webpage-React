import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Disclosures = () => {
	return (
		<div>
			<NavBar/>
			<Row>
				<Col xs={12} sm={12} md={12} lg={12} xl={12} id="disclosure_container">
					<div className="disclosure_wrapper first">
						<h1 id="surge_price_disclosure" className="disclosure_header">Surge Token Price</h1>
						<div id="surge_price_text">
							The Surge Protocol prevents a Surge Token's price from ever going down when compared to it's backing asset. Surge Tokens may be redeemed for their Backing Assets, and the redeemable value of 1 Surge Token will always rise. The fiat value of a Surge Token relies entirely on the fiat value of its backing asset.  Both of these factors should be taken into consideration before investing.  Please see our risks disclore below before investing.
						</div>
					</div>
					<div className="disclosure_wrapper">
						<h1 className="disclosure_header">Disclaimer</h1>
						<div id="disclaimer_text">
							NOT FINANCIAL ADVICE - Offered content is solely for the purpose of education and information, with no implied guarantees of any kind, including warranties of accuracy, completeness, or monetary gains. The Information provided via this document, on xSurge's website, or any related services, is not intended to be, and does not constitute financial advice, investment advice, trading advice or any other advice. The information in this document and on our website is generic in nature and is not specific to you, the User, or anyone else. Unless having conducted proper due diligence including, but not limited to, consultation with a licensed broker or financial advisory, you should not make any financial decision(s) or investment(s) of any kind based on any of the information provided. You understand that using any of the information available on xSurge's website or through another service is at your own risk.
						</div>
					</div>
					<div className="disclosure_wrapper last">
						<h1 className="disclosure_header">Risks</h1>
						<div id="risk_text">
							Investing and Trading may not be for everyone. There are potential rewards, as well as potential risks involved. Anyone wishing to invest should seek their own independent financial or professional advisory.
						</div>
					</div>
				</Col>
			</Row>
			<Footer/>
		</div>
	);
};

export default Disclosures