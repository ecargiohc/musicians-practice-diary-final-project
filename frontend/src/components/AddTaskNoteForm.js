import React, { Component } from "react";
import { Form, Input } from 'semantic-ui-react';

// let user_task_id = this.props.match.params
// const user_task_id: 
// let INITIAL_STATE = {
//     objectives: "",
//     progress_report: "",
//     takeaway: "",
//     // user_task_id: ""
// };
export default class AddTaskNoteForm extends Component {
    
    // state = {INITIAL_STATE};
    state = {
        objectives: "",
        progress_report: "",
        takeaway: "",
        user_task_id: [],

        // editing boolean used in child comp: AddNoteForm
      editing: false,
      selectedNote: {}
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = (event) => {
        const user_task_id = this.props.match.params
        console.log(user_task_id.user_task_id)
        event.preventDefault();
        fetch("http://localhost:3000/api/v1/task_notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                // mode: "no-cors",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ 
                task_note: 
                {
                    objectives: this.state.objectives,
                    progress_report: this.state.progress_report,
                    takeaway: this.state.takeaway,
                    user_task_id: user_task_id.user_task_id
                }
            })
        })
        .then(res => res.json())
        // .then(data => console.log(data))
        // .then(data => this.props.fetchTaskNotes())
        .then(data => this.props.updateTaskNotes(data))
        this.props.history.push('/user_tasks')
    };

    // startEditingNote = (note) => {
    //     this.setState({
    //       editing: true,
    //       selectedNote: note
    //     })
    //   };
    
    //   editTaskNote = (editedNote) => {
    //     console.log(editedNote)
    //     fetch(`http://localhost:3000/api/v1/task_notes/${editedNote.id}`, {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         mode: "no-cors", Authorization: `Bearer ${localStorage.getItem('token')}`
    //       },
    //       body: JSON.stringify({
    //         task_note: {
    //           objectives: editedNote.objectives,
    //           progress_report: editedNote.progress_report,
    //           takeaway: editedNote.takeaway,
    //           user_task_id: editedNote.user_task_id
    //         }
    //       })
    //     }).then(() => {
    //       this.setState({editing: false})
    //       this.props.fetchTaskNotes()
    //     })
    //   };
    
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!this.state.editing) {
    //         this.state.onCreateNote(this.state)
    //     } else if (this.state.editing) {
    //         this.state.onEditNote(this.state)
    //     }
    // }

    componentWillReceiveProps(props) {
        if (props.editing) {
            this.setState({
                // selectedNote: this.props.selectedNote
                ...this.props.selectedNote
            })
        } 
        // else {
        //     this.setState({...this.state})
        // }
    }

    render() {
        // let user_task_id = this.props.match.params
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
            <Form.Button>Create</Form.Button>
        </Form>
        )
    }
}