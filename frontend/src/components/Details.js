import React from 'react';
import { Link } from "react-router-dom";
import { ListGroup, Button, Accordion, Card } from "react-bootstrap";
import AddTaskNoteForm from './AddTaskNoteForm';

const Details = (props) => {

    let { user_task_id } = props.match.params

    return (
        <div>
            {props.editing === true ? <AddTaskNoteForm fetchTaskNotes={props.fetchTaskNotes} selectedNote={props.selectedNote} editing={props.editing}/> : null}
            <Link {...props} id={user_task_id} to={`/addtasknote/${user_task_id}`}>Add Notes</Link>
            {props.task_notes.map(n => {
                if (user_task_id == n.user_task.id) {
                    return (
                        <Accordion defaultActiveKey="0">
                        {/* <Button id={n.id} onClick={(event) => props.startEditingNote(event)}>Edit?</Button> */}
                {/* <button id={n.id} className="button muted-button" onClick={() => props.startEditingNote(n)}>Edit</button> */}
                        {/* <button id={n.id} className="button muted-button" onClick={() => props.editTaskNote(n)}>EditFETCH</button> */}
                        {/* <Link {...props} to={`/addtasknote/${user_task_id}`}>EditFetch</Link>*/}
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                The Objectives
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body><cite>{n.objectives}</cite></Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                Progress Report
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body><cite>{n.progress_report}</cite></Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                What I learned
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body><cite>{n.takeaway}</cite></Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
                )}})}
            {/* <Link id={user_task_id} to={`/addtasknote/${user_task_id}`}>Add TaskNote</Link>
            {props.task_notes.map(n => {
                if (user_task_id == n.user_task.id) {
                    console.log(n)
                    return (
                    <div><ul>objectives: <br></br>{n.objectives}</ul>
                        <ul>progress report: <br></br>{n.progress_report}</ul>
                        <ul>takeaways: <br></br>{n.takeaway}</ul>
                    </div>)
                }
            })} */}
            {/* <div>
            subtasks
            <Link id={user_task_id} to={`/addsubtask/${user_task_id}`}>Add SubTask</Link>
            {props.sub_tasks.map(s => {
                    if (user_task_id == s.task.id) {
                        console.log(s)
                        return ( <div>
                        <li>{s.tempo}</li>
                            {/* <li>{s.rhythm}</li> */}
                        {/* </div>)
                    }
                })}
            </div> */} 
        <div>
            <Link id={user_task_id} to={`/addsubtask/${user_task_id}`}>Add Details</Link>
            {props.sub_tasks.map(s => {
                    if (user_task_id == s.task.id) {
                        // console.log(s)
                        return (
            <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Tempo
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body><cite>{s.tempo}</cite></Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Rhythm
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body><cite>{s.rhythm}</cite></Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Pitch/Intonation
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body><cite>{s.intonation}</cite></Card.Body>
                </Accordion.Collapse>
            </Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Dynamics
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body><cite>{s.dynamics}</cite></Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Articulation
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body><cite>{s.articulation}</cite></Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Phrasing
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body><cite>{s.phrasing}</cite></Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    Style
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                <Card.Body><cite>{s.style}</cite></Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
                )}})}
            </div>
        </div>
    )
};
export default Details;
