import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Grid, Segment, Label, Button } from 'semantic-ui-react';

// //NOT USING THIS FILE ANYMORE
export default class UserProfile extends Component {
    state = {
        user_tasks: []
    };

    fetchCurrentUserTasks = () => {
        fetch("http://localhost:3000/api/v1/user_tasks/1")
          .then(resp => resp.json())
          .then(data => {
            this.setState({
              user_tasks: data.task
            });
          }).then(resp => resp.json())
          .then(data => console.log(data))
      };

    render() {
        return(
            <div>
            <Grid columns={3} divided>
                <Grid.Row stretched>
                <Grid.Column>
                    <Segment>
                    <h5>Welcome Back,</h5><h2>{this.props.currentUser.username} !</h2>
                    <Label 
                    image="https://66.media.tumblr.com/978b4614b2e9838c317a02e853442842/tumblr_p69sqaQOOM1s4yg05o1_1280.jpg"
                    />
                <h5>{this.props.currentUser.instrument}</h5>
                <p>your current resume: {this.props.currentUser.resume}</p>
                <Button as={Link} to="/media">
                Share media
                </Button>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <Button as={Link} to="/task_form">
                            Record Today
                        </Button>
                    </Segment>
                    <Segment>
                        <Button as={Link} 
                        to="user_tasks"
                        >
                            View Your Logs
                        </Button>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <Button as={Link} 
                        to="/media"
                        >
                            View Your Media
                        </Button>
                    </Segment>
                    <Segment>
                        <Button as={Link} 
                        to="/comments"
                        >
                            Feedback Received 
                        </Button>
                    </Segment>
                </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
        )
    }
}