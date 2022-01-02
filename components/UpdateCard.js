import { Component } from 'react';
import {Row, Col, Image, Button, Card} from 'react-bootstrap';
import '../css/updateCard.module.css'

export default function UpdateCard() {
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
