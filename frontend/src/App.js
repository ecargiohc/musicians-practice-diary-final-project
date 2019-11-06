import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import "./index.css";
// 11/1/19
import Login from './Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from "./Navbar";

import UserContainer from "./containers/UserContainer";
import TaskContainer from './containers/TaskContainer';
import SubTaskContainer from './containers/SubTaskContainer';
import TaskNoteContainer from './containers/TaskNoteContainer';
import UserTaskContainer from './containers/UserTaskContainer';
import CurrentUserTask from './components/CurrentUserTask';
import MediaContainer from './containers/MediaContainer';
import CommentContainer from './containers/CommentContainer';
import AddCommentForm from './components/AddCommentForm';
import ViewComment from './components/ViewComment';
import AddTaskForm from './components/AddTaskForm';
import UserProfile from './components/UserProfile';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user_tasks: [],
      tasks: [],
      // current_user_tasks: []
    }
  };

  componentDidMount() {
    this.fetchUserTasks();
  };
  fetchUserTasks = () => {
    fetch("http://localhost:3000/user_tasks")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          user_tasks: data
        });
      });
  };

  // fetchCurrentUserTasks = () => {
  //   fetch("http://localhost:3000/user_tasks/1")
  //     .then(resp => resp.json())
  //     .then(data => {
  //       this.setState({
  //         current_user_tasks: data
  //       });
  //     });
  // };

  updateUserTasks = (data) => {
    console.log(data);
    this.setState({
      user_tasks: [...this.state.user_tasks, data]
    })
  };

  current_user_task = () => {
    this.state.user_tasks.find(ut => {
      return ut.user_id === 1
      // return u
    })
  }
 
  // set currentuser from Logged in user
  render(){
    return (
      <Router>
        <div className="App">
        <Navbar />
          <Route exact path='/login' render={() => {
              return (
                <Login />
              )
            }} />
            {/* <Route exact path="/users" component={UserContainer} /> */}
            <Route exact path="/current_user" component={UserContainer} />
            {/* <Route exact path="/tasks" component={TaskContainer} /> */}
            <Route exact path="/sub_tasks" component={SubTaskContainer} />
            {/* <Route exact path="/sub_task/:id" component={SubTaskContainer} /> */}
            <Route exact path="/user_tasks" 
            // component={UserTaskContainer} 
            render={() => {
              return ( <div>
                <UserTaskContainer
                  user_tasks={this.state.user_tasks}
                  tasks={this.state.tasks}
                  updateUserTasks={this.updateUserTasks}
                /> 
                {/* <AddTaskForm 
                updateUserTasks={this.updateUserTasks}
                /> */}
                </div>);
              }}
            />
            <Route exact path="/user_tasks/1"
            render={() => {
              return (
                <UserProfile
                current_user_tasks={this.state.current_user_tasks}
                />
              )
            }}
            />
            <Route exact path="/task_notes" component={TaskNoteContainer} />
            <Route exact path="/task_form" component={AddTaskForm} />
            <Route exact path="/media" component={MediaContainer} />
            <Route exact path="/add_comment" component={AddCommentForm} />
            <Route exact path="/comments" component={CommentContainer} />
            <Route exact path="/user_tasks/current_user" 
            render={() => {
              return (
                <CurrentUserTask 
                current_user_task={this.current_user_task}
                user_tasks={this.state.user_tasks}
                />
              )
            }}
            // component={CurrentUserTask} 
            />
        </div>
      </Router>
    )
  }
}
