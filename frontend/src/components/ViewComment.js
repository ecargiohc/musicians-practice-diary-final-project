import React from 'react';
import { ListGroup } from "react-bootstrap";

const ViewComment = props => {

    return(
        <div>
            <ListGroup variant="flush">
                {props.comments.map(c => {
                    return <ListGroup.Item key={c.id}>
                        {c.feedback} 
                        {/* submitted by: {c.user.username} */}
                        </ListGroup.Item>
                    }
                )}
            </ListGroup>
            {/* VIEWCOMMENT COMPONENT */}
            {/* {props.comments.map(c => {
                return <ul key={c.id}>
                    {c.feedback}
                    </ul>
                }
            )} */}
        </div>
    )
};
export default ViewComment;