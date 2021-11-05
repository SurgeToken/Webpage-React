import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WidgetChart from './WidgetChart';
import WidgetCalc from './WidgetCalc';


class VS extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tokenID: ''
        };
    }

    handleClick = (e) => {
        const tokenID = e.target.id;
        this.setState({
            tokenID: tokenID            
        });
      }
    
    render() {
        return (
            <div>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="vstatsButtons">
                    <ButtonGroup aria-label="Basic example">
                        <Button className="tokenButton" onClick={this.handleClick} id="surgeUSD">
                        <img alt="" src="assets/img/logo.png" className="tokenLogo"/>  <span className="tokenName" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"  aria-current="true" aria-label="SurgeUSD" >surgeUSD</span>
                        </Button>
                        <Button className="tokenButton" onClick={this.handleClick} id="surgeETH">
                        <img alt="" src="assets/img/logo.png" className="tokenLogo"/>  <span className="tokenName" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"  aria-current="true" aria-label="SurgeETH" >surgeETH</span>
                        </Button>
                        <Button className="tokenButton" onClick={this.handleClick} id="surgeBTC">
                        <img alt="" src="assets/img/logo.png" className="tokenLogo"/>  <span className="tokenName" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"  aria-current="true" aria-label="SurgeBTC" >surgeBTC</span>
                        </Button>
                        <Button className="tokenButton" onClick={this.handleClick} id="surgeADA">
                        <img alt="" src="assets/img/logo.png" className="tokenLogo"/>  <span className="tokenName" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"  aria-current="true" aria-label="SurgeADA" >surgeADA</span>
                        </Button>
                        <Button className="tokenButton" onClick={this.handleClick} id="surgeUSLS">
                        <img alt="" src="assets/img/logo.png" className="tokenLogo"/>  <span className="tokenName" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"  aria-current="true" aria-label="SurgeUSLS" >surgeUSLS</span>
                        </Button>
                    </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6} className="tokenChart">
                        <WidgetChart/>
                   </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6} className="tokenCalc">
                       <WidgetCalc/>
                    </Col>
                </Row>
                
            </div>
        )
    }
    
}
export default VS;