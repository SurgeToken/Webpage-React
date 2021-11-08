import React from "react";
import NavBar from "../components/NavBar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';

const Education = () => {
    
  return (
    <div>
       <NavBar/>
       <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edLogo">
          <Image src="assets/img/xsurgeeducation.png" className="edTitle" />
        </Col>
       </Row>

       <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edToken">
          <h3><span className="herospan"><em>xSurge</em></span></h3>
        </Col>
       </Row>
       <Row>
         <Col xs={12} sm={12} md={12} lg={12} xl={12} >
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>How to use the XTrader dApp</Accordion.Header>
              <Accordion.Body>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edLogo">
                  <Image src="assets/img/xtrader1.png" className="edImg" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>Go to https://app.xsurge.net/</p>
                <p>Once loaded, Click the Connect Wallet icon at the top right. This app can be used from a PC or a phone.</p>
                <p>Android Users can connect via dApps through their wallet app.</p>
                <p>iOS Users will use an external browser (Chrome, Firefox, or Safari)</p>
                <p>Methods of connecting below:</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/xtrader2.png" className="edImg4" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/xtrader3.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/xtrader4.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>A QR Code will appear as depicted below.  You'll scan this with your phone in a moment.  For now, leave it up and go to your Trust Wallet on your phone.</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/xtrader5.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/xtrader6.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>Use the Camera on your phone to scan the QR code from your desktop.  This will connect your wallet to the dApp.</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edLogo">
                  <Image src="assets/img/xtrader7.png" className="edImg4" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>To start, go to the dApp and click Connect Wallet:</p>
                <p><em>Note: For iOS users, you will need to use your phone browser.  Android users will use dApps to connect through their Wallet app.  The steps are the same for both, however, there is an extra step for connecting through dApps browser (Android User Only) that will be included in this tutorial.  iOS users can ignore this step.</em></p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/xtrader8.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edLogo">
                  <Image src="assets/img/xtrader9.png" className="edImg5" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>At this point you should be connected to the dApp and ready for purchase.</p>
                <p>As shown below, start by selecting the Token you want to buy from the Drop-down.</p>
                <p>Next, enter the amount of BNB or use the slider to pick a percentage of the amount of BNB you want to trade.</p>
                <p>Lastly, click accept to go through with the transaction.</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/xtrader10.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>Your Trust Waller or Metamask will prompt you to approve the transaction.  Before doing so, verify the Gas Limit is set to at least 1,200,000.</p>
                <p><em>Note: The dApp does this automatically, but it is always best practice to verify first before submitting the transaction.</em></p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/xtrader11.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>Once approved, the tokens will be routed directly to your wallet.  You must add the Custom Token to see them.</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edLogo">
                  <Image src="assets/img/xtrader12.png" className="edImg5" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>The contract addesses can be found at our official webpage for copy/paste but they will also be listed at the end of this tutorial.</p>
                <p>First, go to your Trust Wallet homescreen and click the Settings icon on the top right.</p>
                <p>Scroll to the bottom until you see "Add Custom Token", Click it.</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/xtrader13.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>Next, and this is most important, before entering the contract address, YOU MUST SELECT THE NETWORK as SmartChain.</p>
                <p><em>The default entry for this field is Ethereum.  If you do not select SmartChain Network, it will add the wrong custom token and you will not see you tokens appear in your wallet.  The most common complaint has to do with this issues.  Follow the steps depicted below.</em></p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/xtrader14.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>Next, go to the official xSurge webpage (<a href="https://xsurge.net">xSurge - True Decentralized Finance</a> and retrieve the contract address for the token you are adding.</p>
                <p>Copy the Contract Address and past it into the Contract Address field.  The remaining fields will autopopulate <strong>if you are on the SmartChain Network.</strong></p>
                <p>Click Done.</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/xtrader15.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p><strong>Here are the most current contract address for reference:</strong></p>
                  <ul>
                    <li>SurgeUSD (SUSD): 0x14fEe7d23233AC941ADd278c123989b86eA7e1fF </li>
                    <li>SurgeETH (SETH): 0x5B1d1BBDCc432213F83b15214B93Dc24D31855Ef </li>
                    <li>SurgeBTC (SBTC): 0xb68c9D9BD82BdF4EeEcB22CAa7F3Ab94393108a1 </li>
                    <li>SurgeADA (SADA): 0xbF6bB9b8004942DFb3C1cDE3Cb950AF78ab8A5AF </li>
                    <li>SurgeUseless (SUSLS): 0x2e62e57d1D36517D4b0F329490AC1b78139967C0 </li>
                  </ul>
                <p><strong>When Selling Surge Tokens:</strong></p>
                <p>Add these custom tokens to your wallet before you sell.  These are what you receive back:</p>
                  <ul>
                    <li>When Selling SurgeADA - You get: Binance-Peg Cardano Token: 0x3ee2200efb3400fabb9aacf31297cbdd1d435d47 </li>
                    <li>When Selling SurgeBTC - You get: Binance-Peg BTCB Token: 0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c</li>
                    <li>When Selling SurgeUSD - You get: Binance-Peg BUSD Token: 0xe9e7cea3dedca5984780bafc599bd69add087d56 </li>
                    <li>When Selling SurgeETH - You get: Binance-Peg Ethereum Token: 0x2170ed0880ac9a755fd29b2688956bd959f933f8</li>
                    <li>When Selling SurgeUSLS - You get: UseLess Token: 0x2cd2664ce5639e46c6a3125257361e01d0213657

</li>
                  </ul>
                </Col>
              </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>SurgeFund: Everything you need to know and How it Works</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                  <h4 className="edH4">What Happened?</h4>
                  <p>The SurgeFund is XSurge's attempt to pay back the money that was lost in the SurgeBNB hack occurring on August 16th, 2021. Shortly after notifying the community to pull out of the contract due to a security vulnerability, SurgeBNB was exploited for $5M in BNB. The leadership team and Mark conducted a thorough investigation to determine the culprit and follow the money trail. Authorities were notified by a legal representative of the XSurge team and outside agencies were were hired to help. Unfortunately, the money could not be tracked and recovered. Mark and the team put together a Charitable Donation Fund for everyone who lost the money known as the SurgeFund shortly after.</p>

                  <h4 className="edH4">Technical Breakdown of the Hack that Occurred</h4>
                  <p>SurgeBNB was the only Surge Token that was vulnerable to this exploit. The exploit was from an error in the sell() function, which in the event of a sale would send BNB to a user before updating the total supply. With BNB only, a malicious Smart Contract could send it directly back to Surge, allowing them to purchase at a lower price because of the disparity in the totalSupply. This allowed the attacker to mint Septillions of SBNB Tokens. Other Surge Tokens do not trigger this contract functionality, as such no other surge token is vulnerable to this exploit.</p>
                  <p>Here is the Transaction hash of one of the exploits, this command was ran over ten times in under 60 seconds: <a href="https://bscscan.com/tx/0x7e2a6ec08464e8e0118368cb933dc64ed9ce36445ecf9c49cacb970ea78531d2">Transaction Hash</a></p>

                  <h4 className="edH4">Methods of connecting below:</h4>
                  <p>The SurgeFund is a daily victim claim from a contract pool of BNB. People can claim once every 24 hours. The minimum that can be claimed is .0005 BNB. The maximum claim is the total that you are owed. This works for both TrustWallet and Metamask users.</p>
                  <p>Here is how this works. The amount you can claim in any 24 hour period depends on how much BNB is in the pool, and the total BNB you are owed altogether.</p>
                  <p>For Example: If I have 10 BNB left to claim (my total I am owed), and there is 100 BNB left to distribute to everyone (the total debt). That means I get 10/100 or 1/10th of however much BNB is in the contract at the time I claim. So if there is only 20 BNB in the contract at the time I claim, my claim for that day, will be 0.5 BNB (10 / 20 = 0.5)</p>
                  <p>Although you will not be able to withdraw as much if the amount of BNB in the contract is low, other people claiming shrinks the total amount in the pool. This means that as others claim, you have a larger share of the pool as it fills up in the future.</p>
                  <p>So in conclusion, if you don't claim for 7 days, you will not have 7 days worth of claims stacked, but you'll be able to claim a larger share over time (a larger percentage of what's there) as other people claim from the contract.</p>
                  <p>Under this system, if the total amount of BNB lost in the hack was in the SurgeFund pool or ever is for that matter, everyone would be able to claim their full amount of BNB. This is the most important thing to understand. The total amount lost was over 12k BNB. That will take time to build up. So its important to realize ahead of time, that when you make your first claim, it will likely not be the full amount, you may need to wait until the funds build.</p>
                  <h4 className="edH4">How to Claim:</h4>
                  <p>Through the dApp: <em>See SurgeFund Tutorial: How to Claim & Check Your Claim</em></p>
                  <p>Through the Contract: visit <a href="https://xsurge.net/surgefund/">SurgeFund Page</a></p>
                  <h4 className="edH4">To see your current claim:</h4>
                  <p>Use the SurgeFund Tracker Bot on our Discord Server at <a href="https://discord.gg/ZPkuvkqCmS">XSurge Official Discord</a></p>
                  <p>You can also use this site or our dApp: </p>
                  <ul>
                      <li><a href="https://subscribe.manraj.ca">https://subscribe.manraj.ca</a></li>
                      <li><a href="https://app.xsurge.net/">https://app.xsurge.net/</a></li>
                    </ul>
                  <h4 className="edH4">To answer some frequent questions/concerns we hear:</h4>
                  <p>As of now, there is only little BNB (22 BNB as of Oct 24, 2021) in the contract with some tokens pending the sell to BNB using write function 8 of the contract. Mark sells tokens sent to this contract for BNB manually so it may take sometime for token donations to show as BNB in the pool. You can view the fund holdings here: <a href="https://bscscan.com/tokenholdings?a=0x95c8ee08b40107f5bd70c28c4fd96341c8ead9c7">BSCScan</a></p>
                  <p>The current amount in the pool, if low, leaves little to go around and the people owed the most have the most claim. Because of this, I would hold until the pool grows over time if your current claim is small.</p>
                  <p>As explained above, as you hold and other people claim, the amount of debt decrease as a whole. Those people that continue to claim are slowly paid back and the amount they are owed goes down. So as this happens you are owed a higher percentage of what is in the pool. This increases your amount of entitlement to the claim pool.</p>
                  <h4 className="edH4">So, here's an example scenario:</h4>
                  <p>
                    <em>
                      You are owed $10 and Jimmy is owed $10. The total amount owed is $20 The current amount in the pool is $2.
                    </em>
                  </p>
                  <p>
                    <em>
                    You are both, at that time, entitled to $1 from the claim pool. Jimmy takes his one dollar, and you hold.
                    </em>
                  </p>
                  <p>
                    <em>
                    The total amount owed is now $19. You are owned $10, Jimmy $9.
                    </em>
                  </p>
                  <p>
                    <em>
                    A donation is made in the pool in the amount of $10 bringing the total claim to $11.
                    </em>
                  </p>
                  <p>
                    <em>
                    You are entitled to $5.78 of this $11 Jimmy is entitled to $5.21 of this $11
                    </em>
                  </p>
                  <h4 className="edH4">In Conclusion:</h4>
                  <p>We currently have a few contracts (SBTC, SADA, and SUSLS) that are contributing to the fund with every transaction but Donations are also made on occasion through internal hosted events and community/organization generosity. The most important thing to remember is the contributions made from contract transactions to the SurgeFund are entirely dependent on the volume of the tokens. This means it may take a lot of work, progress, and time before this fund builds substantially. More contributing contracts are to come, including the XTrader bridge ecosystem.</p>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>SurgeFund Tutorial: How to Claim & Check Your Claim</Accordion.Header>
              <Accordion.Body>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut1.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                The SurgeFund is a daily victim claim from a contract pool of BNB. People can claim once every 24 hours. The minimum that can be claimed is .0005 BNB. The maximum claim is the total that you are owed. This works for both TrustWallet and Metamask users.
                </p>
                <p>Here is how this works. The amount you can claim in any 24 hour period depends on how much BNB is in the pool, and the total BNB you are owed altogether.</p>
                <p><em>For Example: If I have 10 BNB left to claim (my total I am owed), and there is 100 BNB left to distribute to everyone (the total debt). That means I get 10/100 or 1/10th of however much BNB is in the contract at the time I claim. So if there is only 20 BNB in the contract at the time I claim, my claim for that day, will be 0.5 BNB (10 / 20 = 0.5)</em></p>
                <p>Although you will not be able to withdraw as much if the amount of BNB in the contract is low, other people claiming shrinks the total amount in the pool. This means that as others claim, you have a larger share of the pool as it fills up in the future.</p>
                <p>So in conclusion, if you don't claim for 7 days, you will not have 7 days worth of claims stacked, but you'll be able to claim a larger share over time (a larger percentage of what's there) as other people claim from the contract.</p>
                <p>Under this system, if the total amount of BNB lost in the hack was in the SurgeFund pool or ever is for that matter, everyone would be able to claim their full amount of BNB. This is the most important thing to understand. The total amount lost was over 12k BNB. That will take time to build up. So its important to realize ahead of time, that when you make your first claim, it will likely not be the full amount, you may need to wait until the funds build.</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut2.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                  We'll start by accessing the dApp and connecting our wallet to initiate a claim:
                </p>
                  <ol>
                    <li>Go to <a href="https://app.xsurge.net/">xSurge dApp</a></li>
                    <li>
                      Once loaded, Click the Connect Wallet icon at the top right. This app can be used from a PC or a phone.
                      <ul>
                        <li>Android Users - Connect via the dApps Browser built in to their wallet app.</li>
                        <li>iOS Users - Use an external browser such as Chrome, Firefox, or Safari to access and use the dApp</li>
                      </ul>
                    </li>
                    <li><em>Both methods of connecting are below</em></li>
                  </ol>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut3.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut4.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut5.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                  A QR Code will appear as depicted below. You'll scan this with your phone in a moment. For now, leave it up and go to your Trust Wallet on your phone.
                </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut6.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                  As shown below, from the homescreen on your wallet app:
                </p>
                  <ol>
                    <li><em>Go to Settings</em></li>
                    <li><em>Select WalletConnect</em></li>
                    <li><em>Enable Permissions (if prompted)</em></li>
                  </ol>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut7.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                  You should now be connected through the PC
                </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut8.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                Review the Picture Below. To start, go to the dApp and click Connect Wallet:
                </p>
                <p>
                  <em>Disclaimer: Accessing and connecting to the dApp on Android and iOS devices is slightly different between the two. YOU MUST abide by these steps for connection to work:</em>
                </p>
                <p>
                  <em>For iOS users, you will need to use your phones external browser.</em>
                </p>
                <p>
                  <em>Android Users must use dApps Browser to connect through their Wallet App.</em>
                </p>
                <p>
                  <em>The steps are the same for both, however, there is an extra step for connecting through dApps browsers (Android User Only) that will be included in this tutorial. iOS Users can ignore this step of selecting the SmartChain Network.</em>
                </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut9.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut10.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                  <em>Now that we're connected, you can make your first claim. On the XTrader Homescreen, you'll see various features for buying, selling, and datatracking your assets.</em>
                </p>
                <p>
                  <em>On the bottom of the screen, you'll see the SurgeFund Button pictured below. Click this button.</em>
                </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut11.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                A description should appear along with a claim button (Pictured Below). The amount shown in the claim button is your current claim in BNB that you are currently entitled to. (I'm opted out so mine appears as 0 BNB)
                </p>
                <p>
                You need to verify this amount. If your claim is extremely low and the gas cost for a claim transaction would be higher than your current claim, then wait. Claiming now would not be worth it. As described in Section 1, your claim will increase over time, just wait until the claim increases before making another attempt.
                </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut12.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                In addition to the XTrader, we have other ways of verifying claims as well. In our Discord we have the absolute best tools for doing so. You can join our discord at this link: <a href="https://discord.gg/yTCZDKRnGQ">XSurge Official Discord</a>
                </p>
                <p>
                In our Discord, under "Community Tools & Resources" locate and click or press on the profile pic of the SurgeFund Tracker Bot. We'll use this window to send a message to the bot.
                </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut13.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                Next simply enter "mysurgefund", as shown below and it will prompt for your address. Enter the address and the bot will provide your fund details to you as shown.</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut14.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                You can also message him "surgefund" for a real-time report of SurgeFund progress.</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut15.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut16.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                To claim, simply click the claim button and this will initiate a transaction to claim from the pool. Your Wallet App will prompt you to approve this transaction. Approve it and view the TRX Hash to view the status and amount transferred to your wallet.
                </p>
                <p>(The picture below is not a real SurgeFund claim approval, just an example transaction approval for visual aid purposes) I have an actual claim transaction I'll show below.</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut17.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                When the transaction succeeds, and you see 0.00 BNB, DONT FREAK OUT. Click "MORE DETAILS" to open the blockchain transaction in bscscan.</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                  <Image src="assets/img/surgefundtut18.png" className="edImg2" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>
                Verify the amount of BNB Transferred to Recipient, as you can see, this is, in fact, less than 0.00 BNB but is still an amount of BNB. Wallet apps have a decimal limit, so if the amount you receive is below that threshold, you will need to verify in bscscan the amount you were transferred. Hopefully this picture helps to clarify reading bscscan transactions as well.</p>
                </Col>
              </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>How SurgeTokens Work, "Do they provide reflections/rewards?"</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                  <p><em>Simple answer, Surge tokens do not provide rewards/reflections to the holders.</em></p>

                  <h4 className="edH4">How Do Surge Tokens Work?</h4>
                  <p>Each Surge Token utilizes a built in contract exchange system that renounces the need for a traditional liquidity pool. Rather than a liquidity pool pair of the backing asset to the token using a traditional market maker method for exchange and price calculation, both assets are stored within the contract itself.</p>

                  <p>Each consumer purchase interacts directly with the contract to buy the tokens with SmartChain BNB (BEP20). These contracts are more commonly referred to as “Swapper” Contracts. The SmartChain is routed to the contract address from the holder's wallet, mitigating the need for a Decentralized Exchange (DEx) or Centralized Exchange (CEx). When the contract receives SmartChain, the SmartChain is swapped for the backing asset, and the price value equivalent of new tokens are minted to increase the total supply. These tokens are then sent to the user's wallet address. Selling has the opposing effect of decreasing the total supply and supplying the backing asset to the seller.</p>

                  <h4 className="edH4">How Does the Engineering Affect the Value?</h4>
                  <p>The price is not set by the standard market maker protocol. Through the power of mathematics, the developer has found and used a different equation for determining the price and its movement.</p>

                  <p>Our price is determined by two factors: • Volatility of the Backing Asset in the Contract • XSurge Price Value Equation (Price = Backing Asset in the Contract ÷ Token Total Supply)</p>

                  <p>Our exchange system is entirely unique from other tokens currently on the market. For this reason, we have coined specific terms by which this exchange system can be referred:</p>
                    <ul>
                      <li>The Liquidity pairing is designed as a SwapPair Liquidity (SWPL) System, in which a swapper contract is employed to perform an autonomous swap to the backing asset using the chain's native coin. In our case, SmartChain BNB (BEP20).</li>
                      <li>The price action algorithm is described as a Price-Increase Tax Ratio (PTR). This algorithm allocates the tax on purchases and sales to shift the ratio between the Backing Asset and the dynamic Total Supply of the token more in favor of the backing asset. PTR maintains a consistent increase in token value to the backing asset regardless of the type of transaction executed.</li>
                    </ul>

                  <h4 className="edH4">PTR Contract Buy</h4>
                  <p>There is a set % tax for both buys and sells. On a buy, new tokens are minted into the total supply. In this example, I'll use 6% as an example. So the Total Supply of Tokens increases and the buyer will receive:</p>
                  <p>X_Surge - (X_Surge * .06) </p>
                  <p>94% of the tokens purchased at current value</p>
                  <p>100% of the BNB used for purchase is swapped for the value equivalent of the backing asset. The backing asset is then routed to the contract pool.</p>
                  <p>Therefore, in this scenario, if the Asset and Surge quantities were both equal before this transaction, PTR would cause a shift in favor of the backing asset, triggering an increase in the price value of the token.</p>

                  <h4 className="edH4">PTR Contract Sell</h4>
                  <p>When tokens are sold back to the contract, the seller pays the same set % tax on the asset they receive. 100% of the tokens sold are then destroyed and completely removed from the total supply. As a result, the Total Supply of Surge decreases, and the seller receives:</p>
                  <p>X_Asset - (X_Asset * .06) </p>
                  <p>94% of the Asset is received from the total worth from Tokens sold</p>
                  <p>So after a sell, the ratio shifts further in favor of the asset in the contract, as more is left in the contract and the token supply decreases. The variant tokens price value is increased further as a result.</p>

                  <h4 className="edH4">The Benefits of Surging Tokens</h4>
                  <p>With this equation and tax system employed, the variant contracts are programmed to only increase the value of the token to the backing asset in the contract. In the case of non-volatile assets, the price value per token can never decrease, only ever increase as transactions are made. In the case of more volatile assets, volatility may affect the price trend in a downward direction or relent to more upward pressure in a bull run of the backing asset. That being said, the trading of the token may provide a buffer or resistance to negative volatility depending on the degree of increased volume.</p>
                  <p>The exchange functions employed by these token variants make it so that Surge Tokens are entirely decentralized. There are no Liquidity Pool Pairings that are needed to be locked or controlled by a centralized entity or owner address. The design schematic is engineered in such a way to improve overall functionality, return on investment, and security of investment for the end user.</p>
                  <p>All owner functions within the contracts are negated with the exception of those that may be used to securely crossover between PCS bridges (v2 > v3). These functions are necessary to protect longevity of the project in the event the current server becomes obsolete. No callable owner functions exist that can negatively affect the contract functionality or value of assets.</p>
                  
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Trust Wallet Safety - Random Tokens in your Wallet? Dusting Attack Education</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                  <p>There have been lots of reports of people getting random tokens added to their wallets. These are what's known as dusting attacks. I'll provide a brief summary of what these are but the short and sweet is DO NOT TOUCH OR MOVE THESE TOKENS. Simply hide them from view in your wallet and forget they are there.</p>

                  <p>Brief Summary:  Dusting attacks are small amounts of coin deposited to a user in an effort to find out who you are. The attacker analyzes transactions accross wallets to identify source companies and individuals. Since dusting attacks rely on a combined analysis of multiple addresses, if a dust fund is not moved, attackers aren't able to make the connections they need to "deanonymize" the wallets.</p>

                  <p>There's also a kind of dusting attack on the Binance Chain, in which they sent tiny amounts of crypto to multiple addresses, leaving a link to a malicious website in the transaction Memo. Be careful! This is a scam. Read the link below for more information.  <a href="https://academy.binance.com/en/articles/what-is-a-dusting-attack">Binance Academy - Dusting Attacks</a></p>

                  <p>This is how they get you:  MinereumBSC, TheVera.io, and Ever.io are common dusting attacks that We've found to be the common denominator in community reports of theft of their crypto. Those reports involve the theft of all of their holdings.</p>

                  <p>We decided to investigate this deeper and ended up doing some research on MinereumBSC specifically. This led us to investigate the contracts (which were encrypted or unavailable for review on the blockchain), and the website listed for the token.</p>

                  <p>NOTE: Out of suspicion, we made sure to do this under conditions that wouldn't leave me vulnerable to an attack. Immediately on opening the webpage, my Antivirus tipped me off to 8 separate fraudulent transaction attempts that led to this writeup. Do not try this at home</p>
                  <p>
                  I recommend to everyone:
                  </p>
                  <ol>
                    <li>
                      Don't research the token you were dusted with. Disable it, and forget about it.
                      <ul>
                        <li>In addition, with a bscscan account, you can hide these tokens from view, which will prevent them from being shown in your wallet on bscscan.</li>
                      </ul>
                    </li>
                    <li>
                      Don't touch the token.
                      <ul>
                        <li>
                        Any attempts to run a transaction, communicates with the encrypted contract which could possibly result in randsomware or malware infection
                        </li>
                      </ul>
                    </li>
                    <li>
                      Don't ever leave DApps connected on your phone. 
                      <ul>
                        <li>
                        Auto-Contracts are direct interaction and pose no vulnerability since since they don't require the passing of your private keys to an outside source.
                        </li>
                      </ul>
                    </li>
                    <li>
                    Always have a good anti-virus
                      <ul>
                        <li>
                        This will prevent any malicious files from accessing your data
                        </li>
                      </ul>
                    </li>
                  </ol> 
                  <p>Lastly, ALWAYS verify contract addresses to officially released announcements before starting, in the middle of entering, and before confirming (triple verification) any transactions.</p>
                  <p>These safe practices take a bit of extra time, but it would save a lot of people money if they were followed like their livelihood depended on it.</p>
                  
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>Trust Wallet Safety - Hacker Prevention</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                  <p>It is best to make certain you have these settings active for your account</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                    <Image src="assets/img/hackerprevention1.jpeg" className="edImg3" />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                    <p>In the event of a sim swap hack, it should mitigate unauthorized entry. In addition, educate yourselves on dusting attacks which are a very frequent occurrence in blockchain.</p>
                    <p>As always</p>
                    <p><h4>NEVER PASS OUT YOUR SEED PHRASE TO ANY PERSON OR WEBSITE FOR ANY REASON</h4></p>
                    <p>Absolutely NO ONE across any social media platforms or tech support will ask for your seed phrase, wallet number, or request a walletconnect.</p>
                    <p>Be extremely careful what details you disclose about yourself on social media. Be especially wary of clicking links that you are not familiar with. If any link you see is a google.docs address, consider it a hack. If any crypto related techsupport sends you a link, automatically assume its a walletconnect. Don't click it. You'll see these scam accounts on Twitter, Facebook, Reddit, and third-party phishing sites everywhere. Most importantly, when using trust wallet, DON'T EVER leave DApps connected to your wallet. Always disconnect.</p>
                    <p>If you are dusted, DO NOT TOUCH IT. To learn more about dusting attacks check the "Trust Wallet Safety - Random Tokens in your Wallet?" section</p>
                    <p>If you even think your phone is getting hacked, immediately disconnect yourself from the internet by activating Airplane Mode, shut down the device and reboot in safemode. Go into your downloads and apps and delete anything suspicious. We strongly recommend getting a good anti-virus.</p>
                    <p>Lastly, and by far, the best mitigation tactic you can do in my opinion, is to completely rid yourself of the Trust Wallet app. Use BSCScan tags to track your personal wallet number and view balances from the blockchain. This ensures that both your device and the app itself are completely removed from the equation until you are ready to sell. You will need your seed phrase on hand to recover your wallet when you are ready to access, so BE SURE TO BACKUP. Save your seed phrase somewhere safe. You can follow the guidlines of this support link to both access and save your backup: <a href="https://community.trustwallet.com/t/how-to-backup-a-multi-coin-wallet/42">Trust Wallet Community</a></p>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>Selling Your Surge</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                  <p>Everyone, in order to sell XSurge Tokens, there is a different route you need to take to execute the transaction. In Buying, we route Smart Chain BNB to the Contract Address to receive tokens. In selling, the steps are different but it works the same way. Tokens are sent to the contract and the backing asset (BUSD/bETH) is received at your wallet address. Selling works the same way for all XSurge token variants.</p>
                  <p>SENDING THROUGH THE NORMAL MEANS (like a buy) WILL NOT RECEIVE THE BACKING ASSET. You must use the "sell" contract function to sell an entered about of tokens after connecting BSCScan to your wallet.</p>
                  <p>
                    You'll need to follow these steps:
                  </p>
                    <ol>
                    <li>Open bscscan on your desktop, open your wallet page to view your holdings and click the surge token to open the contract</li>
                    <li>Click "Write Contract" in the tabs below</li>
                    <li>Click "Connect to Web3" link. Click TW and a QR Code will appear</li>
                    </ol>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                    <Image src="assets/img/sell1.jpeg" className="edImg3" />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                    <Image src="assets/img/sell2.jpeg" className="edImg3" />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                  
                  <p>
                    Next...
                  </p>
                    <ul>
                    <li>Go to Trust Wallet on your phone</li>
                    <li>Click Settings in the lower bar</li>
                    <li>Click Wallet Connect <em>(You may have to allow the app permission to use the camera)</em></li>
                    <li>Scan the QR Code</li>
                    </ul>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                    <Image src="assets/img/sell3.jpeg" className="edImg3" />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                  
                  <p>
                  At this point, allow some time, and a prompt will appear in bscscan notifying you of some details of the feature. Click OK. 
                  </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                    <Image src="assets/img/sell4.jpeg" className="edImg3" />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                  
                  <p>
                  Finally, Just enter the amount you would like to sell in Function 4 of the Contract, Click Write, and it will direct the transaction to the TW app on your phone where you can approve it.
                  </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edImg">
                    <Image src="assets/img/sell5.jpeg" className="edImg3" />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                  
                  <p>
                  Be sure to increase your gas amount in the transaction confirmation to ensure it goes through if it fails the first time. I always up to around 1.2 million.
                  </p>
                  <p>
                  You should be able to do this from a desktop or cell phone. Network traffic may cause difficulty connecting in some cases. Other holders have found that this works much better from a desktop.
                  </p>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
         </Col>
       </Row>

       <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edToken2">
          <h3><span className="herospan"><em>xUSD</em></span></h3>
        </Col>
       </Row>
       <Row>
         <Col xs={12} sm={12} md={12} lg={12} xl={12} >
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is xUSD?</Accordion.Header>
              <Accordion.Body>
              
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
         </Col>
       </Row>

       <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edToken2">
          <h3><span className="herospan"><em>Crypto</em></span></h3>
        </Col>
       </Row>
       <Row>
         <Col xs={12} sm={12} md={12} lg={12} xl={12} >
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is the difference between BNB and BSC?</Accordion.Header>
              <Accordion.Body>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>The Binance Ecosystem runs on two parallel blockchains - BNB(Binance Chain) and BSC (Binance Smart Chain).  BNB and BSC can be swapped 1:1 for a small fee.  BSC enables "Smart Contracts" within the Surge Ecosystem</p>
                </Col>
              </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Why does Trust Wallet say 'Not Available' when I try to purchase BNB or BSC?</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                  <p>TrustWallet's payment processor, Simplex, often has trouble with processing BNB transactions. This can occur when there is liquidity issues with BNB or if Binance is having issues. When this happens, you cannot purchase through TrustWallet. You will either need to wait for Simplex or you will have to purchase BNB elsewhere and transfer it over to TrustWallet.</p>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What are liquidity pools?</Accordion.Header>
              <Accordion.Body>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                <p>In simple terms, a liquidity pool is essentially a "pool" of tokens.</p>

                <p>Liquidity pools can be considered the "order book" of decentralized exchanges. They run on a series of algorithms and they're automated. With liquidity pools, one can simply buy from the "pool" of tokens -- your buy order doesn't have to match a sell order and vice versa.</p>

                <p>Centralized exchanges (market makers) use order book models -- your buy order matches a sell order and vice versa in order to process.</p>

                <p>Pancakeswap is an automated market maker (AMM). An AMM is essentially an decentralized exchange that is powered by a series of algorithms. It allows users to purchase tokens from liquidity pools using an automated system.</p>

                <p><em>Liquid</em> refers to an asset that can be bought or sold. "Liquidity" refers to the availability of a certain asset.</p>
                </Col>
              </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>What are gas fees?</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="edText">
                  <p>Gas fees are paid to cover the cost of a transaction.</p>
                  <p>The fee is a reflection of the amount of computing power/energy that is required to process each transaction.</p>
                  
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
         </Col>
       </Row>

       
    </div>
  );
};

export default Education