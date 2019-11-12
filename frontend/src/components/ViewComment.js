import React from 'react';
import { ListGroup } from "react-bootstrap";

const ViewComment = (props) => {

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
        </div>
    )
};
export default ViewComment;