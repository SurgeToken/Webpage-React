import { Component } from 'react';
import {Row,Col,Image,Link,Button,Card} from 'react-bootstrap';
import '../index.css';
import './UpdateCard.css'

class UpdateCard extends Component {
	render(){
		return (
			<Card>
				<Card.Body>
				<Card.Title>Title</Card.Title>
				<Card.Text className="truncate">
					Some quick example text to build on the card title and make up the bulk of
					the card's content.
				</Card.Text>
				<Button variant="primary">Read</Button>
				</Card.Body>
		  </Card>		
		)
	}
}

export default UpdateCard;