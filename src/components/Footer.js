import { Component } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Footer extends Component{
	render(){
		return (
			<Row>
				 <Col xs={12} sm={12} md={12} lg={12} xl={12}>
					<div id="footer">
						<div id="footer_social_links_container">
							<a href="https://discord.gg/XSURGE" target="_blank">
								<Image src="assets/img/discord.png" className="footer-image" id="footer_social_first" />
							</a>
							<a href="https://instagram.com/XSURGEDEFI" target="_blank">
								<Image src="assets/img/instagram.png" className="footer-image" />
							</a>
							<a href="https://twitter.com/XSURGEDEFI" target="_blank">
								<Image src="assets/img/twitter.png" className="footer-image" />
							</a>
							<a href="https://www.reddit.com/r/XSURGE" target="_blank">
								<Image src="assets/img/reddit.png" className="footer-image" />
							</a>
							<a href="https://t.me/XSURGEDEFI" target="_blank">
								<Image src="assets/img/telegram.png" className="footer-image" />
							</a>
							<a href="https://www.facebook.com/groups/XSURGEDEFI" target="_blank">
								<Image src="assets/img/facebook.png" className="footer-image" id="footer_social_last" />
							</a>
						</div>
						<div id="copyright_links">
							© 2021 xSurge. All rights reserved.
						</div>
						<div class="clear"></div>
						<div id="disclaimer_text">
							Disclaimer – NOT FINANCIAL ADVICE - Offered content is solely for the purpose of education and information, with no implied guarantees of any kind, including warranties of accuracy, completeness, or monetary gains. The Information provided via this document, on XSurge's website, or any related services, is not intended to be, and does not constitute financial advice, investment advice, trading advice or any other advice. The information in this document and on our website is generic in nature and is not specific to you, the User, or anyone else. Unless having conducted proper due diligence including, but not limited to, consultation with a licensed broker or financial advisory, you should not make any financial decision(s) or investment(s) of any kind based on any of the information provided. You understand that using any of the information available on xSurge's website or through another service is at your own risk.
							<br />
							<br />
							Risks – Investing and Trading may not be for everyone. There are potential rewards, as well as potential risks involved. Anyone wishing to invest should seek their own independent financial or professional advisory.
						</div>
					</div>
				</Col>
			</Row>
		)
	}
}

export default Footer;