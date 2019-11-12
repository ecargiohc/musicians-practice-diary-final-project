import React, { Component } from "react";
import { Form } from 'semantic-ui-react';

export default class AddCommentForm extends Component {
    state = {
        feedback: "",
        media_id: 2,
        user_id: 1
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = (event) => {
        // console.log(this.state)
        event.preventDefault();
        fetch("http://localhost:3000/api/v1/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                mode: "no-cors"
            },
            body: JSON.stringify({ 
                comment: 
                {
                    feedback: this.state.feedback,
                    user_id: this.state.user_id, 
                    media_id: this.state.media_id
                }
            })
        }).then(res => res.json())
        .then(data => this.props.fetchComments())
    };

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Input 
                fluid label="Give Feedback" 
                placeholder="constructive criticism only!" 
                name="feedback" 
                value={this.state.feedback} 
                onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Button>Submit</Form.Button>
        </Form>
        )
    };
}

