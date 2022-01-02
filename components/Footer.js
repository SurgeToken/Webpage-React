import { Component } from 'react';
// import {LinkContainer} from 'react-router-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Footer extends Component{
	render(){
		return (
				<footer id="footer">
					<Row>
						<Col xs={12} sm={12} md={6} className="text-center text-md-start order-last order-md-first mt-5px" id="copyright_links">
							© 2021 xSurge. All rights reserved.
						</Col>
						<Col xs={12} sm={12} md={6} className="text-center text-md-end" id="footer_social_links_container">
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
						</Col>
						</Row>
						
						{/* <div className="clear"></div> */}

						<Row>
						<Col xs={12} sm={12} md={12} lg={12} xl={12}>
							<div className="text-center text-md-start mt-5px" id="disclosure_text">
								<div className="LinkContainer" to="/disclosures" className="disclosure_link">
									<span id="disclosure_text_span">Disclosures</span>
								</div>
								<span> | </span>
								<div className="LinkContainer" to="/disclosures" className="disclosure_link">
									<span id="disclosure_text_span">*Surge Price</span>
								</div>
							</div>
						</Col>
						</Row>
				</footer>
		)
	}
}

export default Footer;