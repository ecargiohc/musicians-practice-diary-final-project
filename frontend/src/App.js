import React, { Component, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import "./index.css";
// 11/1/19
import Login from './Login';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Navbar from "./Navbar";
// 11/7
import { api } from "./services/api";
import HomePage from './components/HomePage';

import UserTaskContainer from './containers/UserTaskContainer';
import MediaContainer from './containers/MediaContainer';
import CommentContainer from './containers/CommentContainer';

// 11/11: 11am
import Details from './components/Details';
import AddTaskNoteForm from './components/AddTaskNoteForm';
import AddSubTaskForm from './components/AddSubTaskForm';
import SignUpForm from './components/SignUpForm';
class App extends Component {
  constructor() {
    super();
    this.state = {
      user_tasks: [],

      task_notes: [],
      // editing boolean used in child comp: AddNoteForm
      editing: false,
      selectedNote: {},

      media: [],
      displayMedia: [],
      tasks: [],
      sub_tasks: [],
      auth: {
        user: {}
      },
      // theme: 'light',
      checked: localStorage.getItem("theme") === "dark" ? true : false,
      theme: localStorage.getItem("theme")
    }
  };

   toggleThemeChange = () => {
    const { checked } = this.state;
    // If theme is light then change to dark
    if (checked === false) {
      // Update localstorage
      localStorage.setItem("theme", "dark");
      /**
       * The document.getElementsByTagName(...).setAttribute(...)
       * will only update the value
       */
      // Update the data-theme attribute of our html tag
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
      // Update our state
      this.setState({
        // Ensure our switch is on if we change to dark theme
        checked: true
      });
    } else {
      // Update localstorage
      localStorage.setItem("theme", "light");
      /**
       * The document.getElementsByTagName(...).setAttribute(...)
       * will only update the value until the App is mounted and we change
       * the state of the switch so we will need to introduce
       * a React lifecycle called ˝componentDidMount()˝
       */
      // Update the data-theme attribute of our html tag
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", localStorage.getItem("theme"));
      // Update our state
      this.setState({
        // Ensure our switch is off if we change to light theme
        checked: false
      });
    }
  };
  
  componentDidMount() {
    // Update the data-theme attribute of our html tag
    document
      .getElementsByTagName("HTML")[0]
      .setAttribute("data-theme", localStorage.getItem("theme"));
    this.fetchUserTasks();
    this.fetchTaskNotes();
    this.fetchSubTasks();
    // this.fetchAllComments();
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
    console.log("this is the app data for login", data)
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
    // console.log(user_id)
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
  deleteUserTask = id => {
    let newUserTasks = this.state.user_tasks.slice()
    const updatedTasks = newUserTasks.filter(ut => ut.id != id)
    this.setState({
        user_tasks: updatedTasks
     }, ()=> console.log(this.state))
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
      // console.log(data)
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
      // console.log(data)
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
  // //////////lskjfdl;ASLKDFJALS;KDFJAS;LKFJ
  startEditingNote = (note) => {
    console.log("STARTEDITING")
    console.log(note)
    console.log(note.user_task.id)
    // console.log(note.target)
    // console.log(note.target.value)
    this.setState({
      editing: !this.state.editing,
      selectedNote: note
    })
    // return <Redirect to={`/addtasknote/${note.user_task.id}`} />
    // if (this.state.editing) {
    //     this.setState({
    //         ...this.state.selectedNote
    //     })
    //     console.log("APP EDITING NOTE")
        // <Link {...props} to={`/addtasknote/${user_task_id}`}>EditFetch</Link>
        // this.props.history.push('/addtasknote')
    // } else {
    //     this.setState({...this.state})
    // }
  };

  // componentWillReceiveProps(props) {
  //   if (props.editing) {
  //       this.setState({
  //           ...this.state.selectedNote
  //       })
  //   } else {
  //       this.setState({...this.state})
  //   }
  // };
  editTaskNote = (editedNote) => {
    console.log("EDIT NOTE GAHH")
    console.log(editedNote)

    console.log(editedNote.id)
    // console.log(editedNote.objectives)
    // console.log(editedNote.target.objectives)
    // console.log(editedNote.target.user_task_id)
    fetch(`http://localhost:3000/api/v1/task_notes/${editedNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        mode: "no-cors", 
        Authorization: `Bearer ${localStorage.getItem('token')}`
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

handleEditSubmit = (e) => {
    e.preventDefault();
    if (!this.state.editing) {
        this.createNote(this.state)
    } else if (this.state.editing) {
        this.editTaskNote(this.state)
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

  render(){
    return (
      <>
      <header className="App-header">
          <div className="App" >
        <label class="switch">
            <input type="checkbox" 
            defaultChecked={this.state.checked}
            onChange={() => this.toggleThemeChange()}
            />
            <span class="slider round" />
        </label>
      <Router>
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
                fetchUserTasks={this.fetchUserTasks}
                deleteUserTask={this.deleteUserTask}
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
              // /////;LKADJSF;L
              editTaskNote={this.editTaskNote}
              selectedNote={this.state.selectedNote}
              startEditingNote={this.startEditingNote}
              editing={this.state.editing}
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
              // ////
              handleEditSubmit={this.handleEditSubmit}
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
              // comments={this.state.comments}
              currentUser={this.state.auth.user}
              // fetchAllComments={this.state.fetchAllComments}
              />
            )}
          } />
      </Router>
        </div>
        </header>
   </>
    )
  }
};
export default App;
