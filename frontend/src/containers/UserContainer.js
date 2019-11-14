import React, { Component } from 'react';
import UserProfile from '../components/UserProfile';
import UserTaskContainer from './UserTaskContainer';
// ////NOT USING THIS FILE ANYMORE
class UserContainer extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            currentUser: {}
        }
    };

    componentDidMount() {
        this.fetchUsers();
      };
      fetchUsers = () => {
        fetch("http://localhost:3000/users")
          .then(resp => resp.json())
          .then(data => {
            this.setState({
              users: data,
              currentUser: data[0]
            });
          });
      };

    render() {
        return(
            <div>
              <UserProfile 
              currentUser={this.state.currentUser}
              />
              {/* <UserTaskContainer /> */}
            {/* "Hello from User Container; is this page necessary? Not really..."
            {this.state.users.map(user => {
                return <li>
                    {user.username}<br></br>
                    {user.instrument}<br></br>
                </li>
            })} */}
            </div>
        )
    }
}
export default UserContainer;