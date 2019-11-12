import React, { Component } from "react";
import { Form, Input } from 'semantic-ui-react';

let INITIAL_STATE = {
    objectives: "",
    progress_report: "",
    takeaway: "",
    user_task_id: 1
}

export default class AddTaskNoteForm extends Component {
    state = INITIAL_STATE;

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.editing) {
            this.props.onCreateNote(this.state)
        } else if (this.props.editing) {
            this.props.onEditNote(this.state)
        }
    }

    componentWillReceiveProps(props) {
        if (props.editing) {
            this.setState({
                ...props.selectedNoteToEdit
            })
        } else {
            this.setState({...INITIAL_STATE})
        }
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Input 
                fluid label="Objectives" 
                placeholder="what are your goals today?" 
                name="objectives" 
                value={this.state.objectives} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="Progress Report" 
                placeholder="record the progress made" 
                name="progress_report" 
                value={this.state.progress_report} 
                onChange={event => this.handleChange(event)}/>
                <Form.Input 
                fluid label="Takeaway" 
                placeholder="things I learned..." 
                name="takeaway" 
                value={this.state.takeaway} 
                onChange={event => this.handleChange(event)}/>
            </Form.Group>
            <Form.Button>Submit</Form.Button>
        </Form>
        )
    }
}