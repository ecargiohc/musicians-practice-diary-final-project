import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, Button, Accordion, Card } from "react-bootstrap";
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

    fetchDelete = (event) => {
        event.preventDefault();
        // debugger
        if (event) {
        // console.log(event.target.id)
        fetch(`http://localhost:3000/api/v1/user_tasks/${event.target.id}`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            mode: "no-cors", 
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(this.props.deleteUserTask(event.target.id))
        .catch(err => console.log(err))
        }
    };
    
    render() {
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return (
            <div>
                Your Task Glossary
                {this.props.user_tasks.map((ut) => {
                    return (
                        <Accordion>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" key={ut.id}>
                                 <strong>date: </strong>
                                 {(new Date(ut.task.created_at)).toLocaleDateString('en-US', DATE_OPTIONS)}
                                 {/* {ut.task.created_at} */}
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body className="cardBODY">
                            <Link id={ut.id} to={`/details/${ut.id}`}>See Details</Link>&ensp;
                       <button className="button muted-button" id={ut.id} onClick={(event) => this.fetchDelete(event)}>Delete</button>
                             <ListGroup.Item>
                                 <strong>scales: </strong>
                                 {ut.task.scales}
                             </ListGroup.Item>
                             <ListGroup.Item>
                                 <strong>arpeggios: </strong>
                                 {ut.task.arpeggios}
                             </ListGroup.Item>
                             <ListGroup.Item>
                                 <strong>etudes: </strong>
                                 {ut.task.etudes}
                             </ListGroup.Item>
                             <ListGroup.Item>
                                 <strong>sight reading: </strong>{ut.task.sight_reading}
                             </ListGroup.Item>
                             <ListGroup.Item>
                                 <strong>soli: </strong>
                                 {ut.task.solo}
                             </ListGroup.Item>
                             <ListGroup.Item>
                                 <strong>concerti: </strong>
                                 {ut.task.concerto}
                             </ListGroup.Item>
                             <ListGroup.Item>
                                 <strong>excerpts: </strong>
                                 {ut.task.excerpts}
                             </ListGroup.Item>
                       </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                        </Card>
                        </Accordion>
                    // <ListGroup variant="flush">
                    //     <div key={ut.id}>
                    //     <Link id={ut.id} to={`/details/${ut.id}`}>Details</Link>
                    //     <button className="button muted-button" id={ut.id} onClick={(event) => this.fetchDelete(event)}>Delete</button>
                    //         <ListGroup.Item>
                    //             <label>date:</label>
                    //             {ut.task.created_at}
                    //         </ListGroup.Item>
                    //         <ListGroup.Item>
                    //             <label>scales:</label>
                    //             {ut.task.scales}
                    //         </ListGroup.Item>
                    //         <ListGroup.Item>
                    //             <label>arpeggios:</label>
                    //             {ut.task.arpeggios}
                    //         </ListGroup.Item>
                    //         <ListGroup.Item>
                    //             <label>etudes:</label>
                    //             {ut.task.etudes}
                    //         </ListGroup.Item>
                    //         <ListGroup.Item>
                    //             <label>sight reading:</label>{ut.task.sight_reading}
                    //         </ListGroup.Item>
                    //         <ListGroup.Item>
                    //             <label>soli:</label>
                    //             {ut.task.solo}
                    //         </ListGroup.Item>
                    //         <ListGroup.Item>
                    //             <label>concerti:</label>
                    //             {ut.task.concerto}
                    //         </ListGroup.Item>
                    //         <ListGroup.Item>
                    //             <label>excerpts:</label>
                    //             {ut.task.excerpts}
                    //         </ListGroup.Item>
                    //     </div>
                    // </ListGroup>
                    )
                })}
                <br></br>
            </div>
        )
    }
}
export default UserTaskContainer;