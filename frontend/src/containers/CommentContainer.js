import React, { Component } from 'react';
import { api } from "../services/api";
import ViewComment from '../components/ViewComment';
import { ListGroup } from "react-bootstrap";
import AddCommentForm from '../components/AddCommentForm'

class CommentContainer extends Component {
  state = {
    comments: []
  };

    componentDidMount() {
      this.fetchAllComments();
    };
    fetchAllComments = () => {
      api.comments.getComments()
      .then(data => {
        console.log(data)
        this.setState({ 
          comments: data
        })
      })
    };

    render() {
      return(
      <div>
        <AddCommentForm />
        <ListGroup variant="flush">
          {this.state.comments.map(c => {
            return <ListGroup.Item key={c.id}>
              {c.feedback} 
              {/* submitted by: {c.user.username} */}
              </ListGroup.Item>
            }
          )}
      </ListGroup>
      </div>
      )
    }
};
export default CommentContainer;