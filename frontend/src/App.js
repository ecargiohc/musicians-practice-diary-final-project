import React, { Component, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import "./index.css";
// 11/1/19
import Login from './Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from "./Navbar";
// 11/7
import { api } from "./services/api";
import HomePage from './components/HomePage';

import UserContainer from "./containers/UserContainer";
import UserTaskContainer from './containers/UserTaskContainer';
import CurrentUserTask from './components/CurrentUserTask';
import MediaContainer from './containers/MediaContainer';
import CommentContainer from './containers/CommentContainer';
import UserProfile from './components/UserProfile';

// 11/7: 4pm
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import { useDarkMode } from './useDarkMode';
import Toggle from './Toggle';
// 11/11: 11am
import Details from './components/Details';
import AddTaskNoteForm from './components/AddTaskNoteForm';
import AddSubTaskForm from './components/AddSubTaskForm';
import TaskNoteContainer from './containers/TaskNoteContainer';
import SignUpForm from './components/SignUpForm';
// 11/12
import { withRouter } from "react-router-dom";
class App extends Component {
  constructor() {
    super();
    this.state = {
      user_tasks: [],
      task_notes: [],
      media: [],
      displayMedia: [],
      tasks: [],
      sub_tasks: [],
      auth: {
        user: {}
      },
      theme: 'light'
    }
  };

  // something =() => {
  //   if (!componentMounted) {
  //     // return <div />
  //     return useDarkMode();
  //   };
  // }

  // const [theme, setTheme] = useState('light');
  toggleTheme = (e) => {
    // console.log("toggle method", e.target)
    // if the theme is not light, then set it to dark
    if (this.state.theme === 'light') {
      this.setState({
        theme: 'dark'
      }, ()=> console.log(this.state.theme))
    // otherwise, it should be light
    } else {
      this.setState({
        theme: 'light'
      }, ()=> console.log(this.state.theme));
    };
  };

  componentDidMount() {
    this.fetchUserTasks();
    this.fetchTaskNotes();
    this.fetchSubTasks();
    this.fetchAllComments();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no token found");
    } else {
      api.auth.getCurrentUser().then(user => {
        const updatedState = {...this.state.auth, user: user}; 
        this.setState({auth: updatedState})
      })
    }
  };

  login = data => {
    const updatedState = { ...this.state.auth, user: data };
    localStorage.setItem("token", data.jwt);
    this.setState({ auth: updatedState });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ auth: { user: {} } }, () => console.log(this.state.auth.user));
    // this.props.location.push('/login');
    window.location = 'http://localhost:3001/login'
  };

  fetchUserTasks = () => {
    const user_id = this.state.auth.user.user_id;
    console.log(user_id)
    fetch("http://localhost:3000/api/v1/v1_user_tasks", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', 
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ user_id })
    })
    .then(resp => resp.json())
    .then(data => this.setState({ user_tasks: data}))
  };
  updateUserTasks = (data) => {
    console.log(data);
    this.setState({
      user_tasks: [...this.state.user_tasks, data]
    })
  };

  // fetchUserMedia = () => {
  //   const user_id = this.state.auth.user.user_id;
  //   console.log(user_id)
  //   fetch("http://localhost:3000/api/v1/v1_user_media", {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json', 
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     },
  //     body: JSON.stringify({ user_id })
  //   })
  //   .then(resp => resp.json())
  //   .then(data => this.setState({ media: data}))
  // };

  fetchTaskNotes = () => {
    api.task_notes.getTaskNotes()
    .then(data => {
      console.log(data)
      this.setState({ task_notes: data})
    })
  };
  updateTaskNotes = (data) => {
    this.setState(
          prevState => ({
              task_notes: [...prevState.task_notes, data]
          }))
  };

  fetchSubTasks = () => {
    api.sub_tasks.getSubTasks()
    .then(data => {
      console.log(data)
      this.setState({ sub_tasks: data})
    })
  };
  updateSubTasks = (data) => {
    this.setState(
      prevState => ({
        sub_tasks: [...prevState.sub_tasks, data]
      })
    )
  }

  fetchAllComments = () => {
    api.comments.getComments()
    .then(data => {
      console.log(data)
      this.setState({ 
        comments: data
      })
    })
  };

  render(){
    // api.task_notes.getTaskNotes()
  // const [theme, toggleTheme, componentMounted] = useDarkMode();
  // const themeMode = theme === 'light' ? lightTheme : darkTheme;
  // if (!componentMounted) {
  //   return <div /> 
  // };
    return (
      <ThemeProvider
         theme={this.state.theme === 'light' ? lightTheme : darkTheme}
      >
        <>
        <GlobalStyles />
        <Toggle theme={this.state.theme} />
        <h1>It's a {this.state.theme === 'light' ? 'light theme' : 'dark theme'}!</h1>
         <button onClick={(e) => this.toggleTheme(e)}>Toggle theme</button>
         {/* <button onClick={() => this.toggleTheme}></button> */}

      <Router>
        <div className="App" >
        {/* 11/7 */}
        <Navbar 
        currentUser={this.state.auth.user}
        handleLogout={this.logout}
        />
        {/* 11/7 */}
        <Route exact path='/login' render={(props) => 
          <Login {...props}
          handleLogin={this.login}/>
          } />
        <Route exact path='/new_user' component={SignUpForm}/>
        <Route exact path="/" render={() => {
          return (
            <HomePage 
            currentUser={this.state.auth.user}
            user_tasks={api.user_tasks.getUserTasks()}
            task_notes={this.state.task_notes}
            // fetchTaskNotes={this.fetchTaskNotes}
            // fetchSubTasks={this.fetchSubTasks}
            updateUserTasks={this.updateUserTasks}
          /> )}} />
        <Route exact path="/user_tasks" 
          render={() => {
            return ( <div>
              <UserTaskContainer
                user_tasks={this.state.user_tasks}
                tasks={this.state.tasks}
              /> 
              </div>);
            }}
          />
          <Route exact path="/details/:user_task_id" render={props => {
            return (
              <Details
              {...props}
              task_notes={this.state.task_notes}
              sub_tasks={this.state.sub_tasks}
              />
            )
          }} />
          <Route exact path="/users"/>
          <Route exact path="/addtasknote/:user_task_id" render={props => {
            return (
              <AddTaskNoteForm
              {...props}
              fetchTaskNotes={this.fetchTaskNotes}
              updateTaskNotes={this.updateTaskNotes}
              />
            )}}/>
          <Route exact path="/addsubtask/:user_task_id" render={props => {
            return (
              <AddSubTaskForm 
              {...props}
              updateSubTasks={this.updateSubTasks}
              />
            )}}/>
          <Route exact path="/media" render={props => {
            return (
              <MediaContainer
              {...props}
              currentUser={this.state.auth.user}
              />
            ) }}
          />
          <Route exact path="/view_add_comment/:media_id" render={
            props => { return (
              <CommentContainer 
              {...props}
              comments={this.state.comments}
              currentUser={this.state.auth.user}
              fetchAllComments={this.state.fetchAllComments}
              />
            )}
          } />
        </div>
      </Router>
      </>
    </ThemeProvider>
   
    )
  }
};
export default App;
