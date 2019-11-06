import React from 'react';
import { NavLink } from 'react-router-dom';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

const link = {
  width: '100px',
  padding: '12px',
  margin: '0 2px 2px',
  textDecoration: 'none',
  color: 'black',
};
 
class Navbar extends React.Component {
  render() {
    return (
      <DropdownMenu>
      <div>
        <div className="menu-button">
        </div>
        <MenuItem text="Login"
          location="/login"
          exact
          style={link}
          activeStyle={{
            background: 'green'
          }}
        ></MenuItem>
        <MenuItem text="Current User"
          location="/current_user"
          exact
          style={link}
          activeStyle={{
            background: 'green'
          }}
        ></MenuItem>
        {/* <MenuItem text="Users"
          location="/users"
          exact
          style={link}
          activeStyle={{
            background: 'green'
          }}
        ></MenuItem> */}
        {/* <MenuItem text="Tasks"
          location="/tasks"
          exact
          style={link}
          activeStyle={{
            background: 'green'
          }}
        ></MenuItem> */}
        <MenuItem text="Media"
          location="/media"
          exact
          style={link}
          activeStyle={{
            background: 'green'
          }}
        ></MenuItem>
        <MenuItem text="UserTasks"
          location="/user_tasks"
          exact
          style={link}
          activeStyle={{
            background: 'green'
          }}
        ></MenuItem>
        <MenuItem text="Comments"
          location="/comments"
          exact
          style={link}
          activeStyle={{
            background: 'green'
          }}
        ></MenuItem>
        <MenuItem text="SubTask"
          location="/sub_tasks"
          exact
          style={link}
          activeStyle={{
            background: 'green'
          }}
        ></MenuItem>
        <MenuItem text="TaskNote"
          location="/task_notes"
          exact
          style={link}
          activeStyle={{
            background: 'green'
          }}
        ></MenuItem>
      </div>
      </DropdownMenu>
    )
  }
}
 
export default Navbar;