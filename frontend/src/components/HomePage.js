import React, { Component } from "react";
import { api } from '../services/api';
import DateFile from './DateFile';
import AddTaskForm from "./AddTaskForm";
import { Image } from "react-bootstrap";

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
      var letterStyle = {
        fontSize: 14,
        textAlign: "center"
    };
        return (
          <div>
            <DateFile /><br></br>
          
            {!!this.props.currentUser.id ? 
            ( <a className="item">
              Welcome {this.props.currentUser.username} !</a>
            ) : null }
            <AddTaskForm 
            currentUser={this.props.currentUser}
            updateUserTasks={this.props.updateUserTasks}
            />
          </div>
        )
    }
}; 