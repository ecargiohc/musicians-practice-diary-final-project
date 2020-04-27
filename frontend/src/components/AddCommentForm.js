import React, { Component } from "react";
import { Form } from 'semantic-ui-react';

export default class AddCommentForm extends Component {
    state = {
        feedback: "",
        auth: {
            user: {}
        },
        media: {}
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = (event) => {
        // console.log(this.props.media_id.media_id)
        const user_id = this.props.currentUser.id
        const media_id = this.props.media_id.media_id
        event.preventDefault();
        fetch("http://localhost:3000/api/v1/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                mode: "no-cors", 
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ 
                comments: 
                {
                    "feedback": this.state.feedback,
                    "user_id": user_id, 
                    "media_id": media_id
                }
            })
        }).then(res => res.json())
        .then(data => console.log(data))
        // 11/12: 11:20A: NEED UPDATE FETCH METHOD. 
        .then(data => this.props.fetchAllComments())
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

