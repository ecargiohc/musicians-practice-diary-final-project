import React from 'react';

const ViewComment = props => {

    return(
        <div>
            VIEWCOMMENT COMPONENT
            {props.comments.map(c => {
                return <ul key={c.id}>
                    {c.feedback}
                    </ul>
                }
            )}
        </div>
    )
};
export default ViewComment;