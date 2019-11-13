import React from 'react';
import { Link } from "react-router-dom";
import AddTaskNoteForm from './AddTaskNoteForm';
import TaskNoteContainer from '../containers/TaskNoteContainer';

const Details = (props) => {

    let { user_task_id } = props.match.params

    return (
        <div>
            tasknotes
            <Link id={user_task_id} to={`/addtasknote/${user_task_id}`}>Add TaskNote</Link>

            {props.task_notes.map(n => {
                if (user_task_id == n.user_task.id) {
                    console.log(n)
                    return (<div><li>{n.objectives}</li>
                        {/* <li>{n.progress_report}</li>
                        <li>{n.takeaway}</li> */}
                    </div>)
                }
            })}
            <div>
            subtasks
            <Link id={user_task_id} to={`/addsubtask/${user_task_id}`}>Add SubTask</Link>
            {props.sub_tasks.map(s => {
                    if (user_task_id == s.task.id) {
                        console.log(s)
                        return ( <div>
                        <li>{s.tempo}</li>
                            {/* <li>{s.rhythm}</li> */}
                        </div>)
                    }
                })}
            </div>
        </div>
    )
};
export default Details;