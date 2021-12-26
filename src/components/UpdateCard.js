import { Component } from 'react';
import {Row,Col,Image,Link,Button,Card} from 'react-bootstrap';
import '../index.css';
import './UpdateCard.css'

class UpdateCard extends Component {
	render(){
		return (
			<Card>
				<Card.Body>
					<div className="version-tag">{this.props.version}</div>
					<Card.Title>{this.props.title}</Card.Title>
					<Card.Text className="truncate">
						{this.props.desc}
					</Card.Text>
					<Button variant="primary">Read</Button>
				</Card.Body>
		  </Card>		
		)
	}
}

export default UpdateCard;