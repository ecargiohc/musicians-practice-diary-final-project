import React, { Component } from 'react';
import AddTaskNoteForm from '../components/AddTaskNoteForm';
import { ListGroup } from "react-bootstrap";



// NOT USING ANYMORE 11/13: 2:40P
class TaskNoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      task_notes: [],
      user_task_id: [],
      // editing boolean used in child comp: AddNoteForm
      editing: false,
      selectedNote: {}
    }
  };

  createNote = (newNote) => {
    console.log(this.state)
    fetch("http://localhost:3000/api/v1/task_notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        mode: "no-cors", 
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        task_note:
        {
          objectives: newNote.objectives,
          progress_report: newNote.progress_report,
          takeaway: newNote.takeaway,
          user_task_id: newNote.user_task_id
        }
      })
    })
    // .then(resp => resp.json())
    .then(data => console.log(data))
      // .then(() => this.props.fetchTaskNotes())
  };

  startEditingNote = (note) => {
    this.setState({
      editing: true,
      selectedNote: note
    })
  };

  editTaskNote = (editedNote) => {
    console.log(editedNote)
    fetch(`http://localhost:3000/api/v1/task_notes/${editedNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        mode: "no-cors"
      },
      body: JSON.stringify({
        task_note: {
          objectives: editedNote.objectives,
          progress_report: editedNote.progress_report,
          takeaway: editedNote.takeaway,
          user_task_id: editedNote.user_task_id
        }
      })
    }).then(() => {
      this.setState({editing: false})
      this.fetchTaskNotes()
    })
  };

  render() {
    return (
      <div>
        {this.state.task_notes.map(n => {
          return <ul>
            Objectives: {n.objectives}<br></br>
            Progress Report: {n.progress_report}<br></br>
            What I learned: {n.takeaway}<br></br>
            <button id={n.id} className="button muted-button" onClick={() => this.startEditingNote(n)}>Edit</button>
          </ul>
        })}
        <AddTaskNoteForm 
          editing={this.state.editing}
          fetchTaskNotes={this.fetchTaskNotes}
          onCreateNote={this.createNote}
          onEditNote={this.editTaskNote}
          selectedNoteToEdit={this.state.selectedNote}
        />
      </div>
    )
  }
};
export default TaskNoteContainer;