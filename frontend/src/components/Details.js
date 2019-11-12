import React from 'react';

const Details = (props) => {

    let { user_task_id } = props.match.params

    return (
        <div>
            tasknotes
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