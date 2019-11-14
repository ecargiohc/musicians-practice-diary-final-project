import React, { Component } from "react";
import { Form, Input, Button } from 'semantic-ui-react';

export default class AddMediaForm extends Component {
    state = {
        name: "",
        url: "",
        auth: {
            user: {}
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = (event) => {
        console.log(this.state)
        console.log(this.props.currentUser.id)
        const user_id = this.props.currentUser.id
        event.preventDefault();
        fetch("http://localhost:3000/api/v1/media", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                mode: "no-cors", 
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ 
                media: 
                {
                name: this.state.name,
                url: this.state.url, 
                user_id: user_id
                }
            })
        }).then(res => res.json())
        // .then(data => console.log(data))
        .then(data => this.props.fetchAllMedia())
    };
    
render() {
    return(
        <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Input 
                fluid label="Title" 
                placeholder="Title" 
                name="name" 
                value={this.state.name} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="Link" 
                placeholder="Provide a url link" 
                name="url" 
                value={this.state.url} 
                onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Button>Submit</Form.Button>
        </Form>
        )
    }
};