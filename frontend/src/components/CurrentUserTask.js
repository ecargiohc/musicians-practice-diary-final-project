import React from 'react';
import UserTaskContainer from '../containers/UserTaskContainer';

class CurrentUserTasks extends React.Component {
    state = {
        task: [],
        currentUser: {
            user_id: 1
        }
    }

    render() {
        return(
            <div>
               {this.props.current_user_task.map(c => {
                return c.user.username
               }
                )}
            </div> 
            
        )
    }
};
export default CurrentUserTasks;