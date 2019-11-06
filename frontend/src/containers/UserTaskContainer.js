import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import CurrentUserTask from '../components/CurrentUserTask';
import TaskNoteContainer from './TaskNoteContainer';
import AddTaskForm from '../components/AddTaskForm';
import AddSubTaskForm from '../components/AddSubTaskForm';
import SubTaskContainer from './SubTaskContainer';

class UserTaskContainer extends Component {
    constructor() {
        super();
        this.state = {
            task: []
            ,
            user:[]
        }
    };

    componentDidMount() {
        this.fetchTasks();
    };

    fetchTasks = () => {
        // console.log("HEY! fetch TASKS")
        fetch("http://localhost:3000/tasks")
            .then(resp => resp.json())
            .then(data => {
            this.setState({
                task: data
                },()=>console.log(this.state));
            }).catch(err=> console.log(err));
    };
      
    fetchSubTasks = () => {
        fetch("http://localhost:3000/sub_tasks")
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    sub_task: data
                });
            });
    };
    // create a function that sets state and triggers createLinks
    createList = () => {        
        return this.props.user_tasks.map((ut) => {
            return (
                <ListGroup variant="flush">
                <div key={ut.id}>
                <ListGroup.Item>
                        <label>date:</label>
                        {ut.task.created_at}
                    </ListGroup.Item>
                    {/* this link should be exclusive to one user, NOT displaying a?ll */}
                    <ListGroup.Item>
                        <label>scales:</label>
                        {ut.task.scales}
                        {/* action href={ut.task.scales}> */}
                        {/* links should lead to SubTasks, exclusive to each task */}
                        {/* <Link to={`/sub_task/${ut.id}`}>{ut.task.scales}</Link> */}
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
                        <label>sight reading:</label>
                        {ut.task.sight_reading}
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
        })
    };
    createUserList = () => {
// function that finds Marc, or user_id: 1, to map out his tasks
        this.props.user_tasks.find(ut => {
            if (ut.user.id === 1) {
                // ut.id = ut.user.id
                return <div>
                    {ut.task.scales}
                    {ut.task.arpeggios}
                </div>
            }})
        };
    

    render() {
        return(
            <div>
                THIS IS USERTASKCONTAINER
                <br></br>
                <AddTaskForm createLinks={this.createLinks} fetchTasks={this.fetchTasks}
                updateUserTasks={this.props.updateUserTasks}
                />
                <ul>
                    {this.createList()}
                </ul>
                <TaskNoteContainer />
                {/* <CurrentUserTask
                user_tasks={this.props.user_tasks}/> */}
                <SubTaskContainer />
                <AddSubTaskForm fetchSubTasks={this.fetchSubTasks} 
                />
                <br></br>
            </div>
        )
    }
}
export default UserTaskContainer;