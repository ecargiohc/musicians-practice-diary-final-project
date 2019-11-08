import React, { Component } from "react";
import { Form, Input } from 'semantic-ui-react';

export default class AddTaskForm extends Component {
    state = {
        scales: "",
        arpeggios: "",
        etudes: "",
        sight_reading: "",
        solo: "",
        concerto: "",
        excerpts: ""
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };
// just create a new task (via fetch post) and then you can associate that to an existing user via the user_task controller
    handleSubmit = (event) => {
        console.log(this.state)
        event.preventDefault();
        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                mode: "no-cors"
            },
            body: JSON.stringify({ 
                task: 
                {
                    scales: this.state.scales,
                    arpeggios: this.state.arpeggios,
                    etudes: this.state.etudes,
                    sight_reading: this.state.sight_reading,
                    solo: this.state.solo,
                    concerto: this.state.concerto,
                    excerpts: this.state.excerpts
                }
            })
        }).then(res => res.json())
        // .then(data => console.log(data))
        // .then(data => this.props.fetchTasks())
        .then(data => {
            this.createUserTask(data)
        })
    };

    createUserTask = (data) => {
        fetch("http://localhost:3000/user_tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                mode: "no-cors"
            },
            body: JSON.stringify({
                "user_id": 1,
                "task_id": data.id
            })
        })
            .then(resp => resp.json())
            // .then(data => console.log(data))
            .then(data => this.props.updateUserTasks(data))
        // })
    };
    
    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                {/* USERTASKFORM */}
            <Form.Group widths='equal'>
                <Form.Input 
                fluid label="Scales" 
                placeholder="your scales" 
                name="scales" 
                value={this.state.scales} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="Arpeggios" 
                placeholder="your arpeggios" 
                name="arpeggios" 
                value={this.state.arpeggios} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="Etudes" 
                placeholder="your etudes" 
                name="etudes" 
                value={this.state.etudes} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="Sight Reading" 
                placeholder="any sight reading today?" 
                name="sight_reading" 
                value={this.state.sight_reading} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="Solo" 
                placeholder="your soli" 
                name="solo" 
                value={this.state.solo} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="Concerto" 
                placeholder="your concerti" 
                name="concerto" 
                value={this.state.concerto} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="Excerpts" 
                placeholder="your excerpts" 
                name="excerpts" 
                value={this.state.excerpts} 
                onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Button>Submit</Form.Button>
        </Form>
        )
    }

}