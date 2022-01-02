import { Component } from 'react';
import { Link } from "react-router-dom";
import {Row, Col, Image, Button, Card} from 'react-bootstrap';
import '../css/updateCard.module.css'

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
					<a href={this.props.filepath} target="_blank"><Button variant="primary">Read</Button></a>
				</Card.Body>
		  </Card>		
		)
	}
}

export default UpdateCard;