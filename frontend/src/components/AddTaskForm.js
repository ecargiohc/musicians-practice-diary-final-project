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
        excerpts: "", 
        auth: {
            user: {}
        }
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };
    handleSubmit = (event) => {
        console.log(this.state)
        event.preventDefault();
        fetch("http://localhost:3000/api/v1/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                mode: "no-cors",
                Authorization: `Bearer ${localStorage.getItem('token')}`
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
        // this.props.history.push('/user_tasks');
    };

    createUserTask = (data) => {
        // console.log(this.state.auth.user.user_id)
        // const user_id = this.state.auth.user.user_id;
        console.log(this.props.currentUser.id)
        const user_id = this.props.currentUser.id
        fetch("http://localhost:3000/api/v1/user_tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                mode: "no-cors", 
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "user_id": user_id,
                "task_id": data.id
            })
        })
            .then(resp => resp.json())
            // .then(data => console.log(data))
            .then(data => this.props.updateUserTasks(data))
    // MAKE ALERT MESSAGE HERE AND DO A REDIRECT/ROUTE TO USERTASK PAGE
    // alert(`Welcome ${this.state.username}! Go ahead and log in with your new username and password :)`)
        // })
    };
    
    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
            <Form.Group 
            widths='equal' 
            >
            {/* <div class="row">
    <div class="col"> */}
                <Form.Input
                style={{width: "100px"}}
                fluid label="Scales" 
                placeholder="scales" 
                name="scales" 
                value={this.state.scales} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Arpeggios" 
                placeholder="arpeggios" 
                name="arpeggios" 
                value={this.state.arpeggios} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Etudes" 
                placeholder="etudes" 
                name="etudes" 
                value={this.state.etudes} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Sight Reading" 
                placeholder="sight reading?" 
                name="sight_reading" 
                value={this.state.sight_reading} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Solo" 
                placeholder="soli" 
                name="solo" 
                value={this.state.solo} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Concerto" 
                placeholder="concerti" 
                name="concerto" 
                value={this.state.concerto} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                style={{width: "100px"}}
                fluid label="Excerpts" 
                placeholder="excerpts" 
                name="excerpts" 
                value={this.state.excerpts} 
                onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Button>Submit</Form.Button>
        </Form>
        )
    }

}