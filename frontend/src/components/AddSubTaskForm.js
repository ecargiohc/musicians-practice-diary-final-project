import React, { Component } from "react";
import { Form, Input } from 'semantic-ui-react';

export default class AddSubTaskForm extends Component {
    state = {
        tempo: "",
        rhythm: "",
        articulation: "",
        dynamics: "",
        phrasing: "",
        style: "",
        intonation: "",
        task_id: 1
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = (event) => {
        const task_id = this.props.match.params
        console.log(task_id)
        event.preventDefault();
        fetch("http://localhost:3000/api/v1/sub_tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                mode: "no-cors", 
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ 
                sub_task: 
                {
                    tempo: this.state.tempo,
                    rhythm: this.state.rhythm,
                    articulation: this.state.articulation,
                    dynamics: this.state.dynamics,
                    phrasing: this.state.phrasing,
                    style: this.state.style,
                    intonation: this.state.intonation,
                    task_id: task_id.user_task_id
                }
            })
        }).then(res => res.json())
        // .then(data => console.log(data))
        .then(data => this.props.updateSubTasks(data))
        this.props.history.push('/user_tasks')
    };

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Tempo" 
                placeholder="Tempo" 
                name="tempo" 
                value={this.state.tempo} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Rhythm" 
                placeholder="Rhythm" 
                name="rhythm" 
                value={this.state.rhythm} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Articulation" 
                placeholder="Articulation" 
                name="articulation" 
                value={this.state.articulation} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Dynamics" 
                placeholder="Dynamics" 
                name="dynamics" 
                value={this.state.dynamics} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Phrasing" 
                placeholder="Phrasing" 
                name="phrasing" 
                value={this.state.phrasing} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Style" 
                placeholder="Style" 
                name="style" 
                value={this.state.style} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Intonation" 
                placeholder="Intonation" 
                name="intonation" 
                value={this.state.intonation} 
                onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Button>Submit</Form.Button>
        </Form>
        )
    }
}