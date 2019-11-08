import React, { Component } from "react";
import { api } from '../services/api';
import DateFile from './DateFile';

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
    }

    render() {
      console.log(this.props.user_tasks)
        return (
          <div>
            <DateFile />
            {!!this.props.currentUser.id ? 
            ( <a className="item">
              Welcome {this.props.currentUser.username} !</a>
            ) : null }
            
          </div>
        )
    }
}; 