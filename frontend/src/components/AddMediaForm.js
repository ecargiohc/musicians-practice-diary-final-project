import React, { Component } from "react";
import { Form, Input, Button } from 'semantic-ui-react';

export default class AddMediaForm extends Component {
    state = {
        name: "",
        url: "",
        user_id: 1
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = (event) => {
        console.log(this.state)
        event.preventDefault();
        fetch("http://localhost:3000/api/v1/media", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                mode: "no-cors"
                // "Access-Control-Allow-Origin" : "*",
                // "Access-Control-Allow-Credentials" : true 
            },
            body: JSON.stringify({ 
                media: 
                {
                name: this.state.name,
                url: this.state.url, 
                user_id: this.state.user_id
                }
            })
        }).then(res => res.json())
        .then(data => this.props.fetchMedia())
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
                placeholder="Url" 
                name="url" 
                value={this.state.url} 
                onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Button>Submit</Form.Button>
        </Form>
        )
    }
};