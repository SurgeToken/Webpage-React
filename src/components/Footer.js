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
						<div id="disclosure_text">
							<LinkContainer to="/disclosures">
								<span id="disclosure_text_span">Disclosures</span>
							</LinkContainer>
						</div>
					</div>
				</Col>
			</Row>
		)
	}
}

export default Footer;