import React from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { api } from '../services/api';

class SignUpForm extends React.Component {
    state = {
        username: "",
        password: "", 
        instrument: "",
        resume: "", 
        photo: ""
    }
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = (e) => {
        // signUp = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password,
                    instrument: this.state.instrument,
                    resume: this.state.resume,
                    photo: this.state.photo
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            if (!data.ok) {
                this.setState({
                    error: true
                })
            }
        //     else {
        //         return (resp.json(), this.props.auth.login()) 
        // }           
     })
    };

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Input 
                fluid label="Username" 
                placeholder="Username" 
                name="username" 
                value={this.state.name} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="Password" 
                placeholder="password" 
                name="password" 
                value={this.state.password} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="instrument" 
                placeholder="instrument" 
                name="instrument" 
                value={this.state.instrument} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="resume" 
                placeholder="resume" 
                name="resume" 
                value={this.state.resume} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="photo" 
                placeholder="photo" 
                name="photo" 
                value={this.state.photo} 
                onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Button>Submit</Form.Button>
        </Form>
            )
    };
}
export default SignUpForm;