import React, { Component } from "react";
import { api } from '../services/api';
import DateFile from './DateFile';
import AddTaskForm from "./AddTaskForm";
import AddTaskNoteForm from "./AddTaskNoteForm";
import AddSubTaskForm from "./AddSubTaskForm";

export default class HomePage extends Component {
  state = {
    user_tasks: []
  }
    componentDidMount() {
        if (!localStorage.getItem('token')) {
          this.props.history.push('/login');
        } else {
          api.auth.getCurrentUser().then(user => {
            if (user.error) {
              this.props.history.push('/login');
            }
          });
        };
    };

    render() {
        return (
          <div>
            <DateFile />
            {!!this.props.currentUser.id ? 
            ( <a className="item">
              Welcome {this.props.currentUser.username} !</a>
            ) : null }
            {/* <AddTaskNoteForm 
            currentUser={this.props.currentUser}
            updateUserTasks={this.props.updateUserTasks}
            /> */}
            <AddTaskForm 
            currentUser={this.props.currentUser}
            updateUserTasks={this.props.updateUserTasks}
            />
            {/* <AddSubTaskForm 
            currentUser={this.props.currentUser}
            /> */}
          </div>
        )
    }
}; 