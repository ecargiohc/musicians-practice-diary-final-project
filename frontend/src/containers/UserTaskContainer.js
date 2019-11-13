import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import CurrentUserTask from '../components/CurrentUserTask';
import TaskNoteContainer from './TaskNoteContainer';
import AddTaskForm from '../components/AddTaskForm';
import AddSubTaskForm from '../components/AddSubTaskForm';
import SubTaskContainer from './SubTaskContainer';
import { api } from "../services/api";
import Details from '../components/Details';

class UserTaskContainer extends Component {
    constructor() {
        super();
        this.state = {
            task: [],
            auth: {
                user: {}
            },
            task_notes: [],
            sub_tasks: []
        }
    };

    // fetchTaskNotes = () => {
    //     const user_id = this.state.auth.user.user_id;
    //     // console.log(user_id)
    //     fetch("http://localhost:3000/api/v1/getTaskNote", {
    //       method: "POST",
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json', 
    //         Authorization: `Bearer ${localStorage.getItem('token')}`
    //       },
    //       body: JSON.stringify({ user_id })
    //     })
    //     .then(resp => resp.json())
    //     .then(data => this.setState({ task_notes: data}))
    //   };

    // taskNoteList = () => {
    //     debugger
    //     return this.props.task_notes.map(t => {
    //         return (
    //             <div key ={t.id}>
    //                 {t.objectives}
    //                 {t.progress_report}
    //                 {t.takeaway}
    //             </div>
    //         )})
    // };

    render() {
        return (
            <div>
                Your Task Glossary
                    {/* {this.createList()} */}
                {this.props.user_tasks.map((ut) => {
                    return (
                    <ListGroup variant="flush">
                        <div key={ut.id}>
                        <Link id={ut.id} to={`/details/${ut.id}`}>Details</Link>
                            <ListGroup.Item>
                                <label>date:</label>
                                {ut.task.created_at}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <label>scales:</label>
                                {ut.task.scales}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <label>arpeggios:</label>
                                {ut.task.arpeggios}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <label>etudes:</label>
                                {ut.task.etudes}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <label>sight reading:</label>{ut.task.sight_reading}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <label>soli:</label>
                                {ut.task.solo}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <label>concerti:</label>
                                {ut.task.concerto}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <label>excerpts:</label>
                                {ut.task.excerpts}
                            </ListGroup.Item>
                        </div>
                    </ListGroup>
                )
                })};
                <br></br>
            </div>
        )
    }
}
export default UserTaskContainer;