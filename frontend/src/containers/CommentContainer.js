import React, { Component } from 'react';
import { api } from "../services/api";
import { ListGroup } from "react-bootstrap";
import AddCommentForm from '../components/AddCommentForm'

class CommentContainer extends Component {
  state = {
    comments: []

  };

    render() {
      let { media_id } = this.props.match.params
      return(
      <div>
        <AddCommentForm 
        media_id={this.props.match.params}
        fetchAllComments={this.props.fetchAllComments}
        currentUser={this.props.currentUser}
        // bring down media id that was clicked
        />
        {/* need conditional if no comments, alert message or else there's a "cannot map through error" */}
        <ListGroup variant="flush">
          {this.props.comments.map(c => {
            if (media_id == c.media.id) {
            return <ListGroup.Item key={c.id}>
              {c.feedback} 
              {/* submitted by: {c.user.username} */}
              </ListGroup.Item>
            }
            }
          )}
      </ListGroup>
      </div>
      )
    }
};
export default CommentContainer;