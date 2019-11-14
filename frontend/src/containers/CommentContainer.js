import React, { Component } from 'react';
import { api } from "../services/api";
import { ListGroup } from "react-bootstrap";
import AddCommentForm from '../components/AddCommentForm';
class CommentContainer extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    this.fetchAllComments();
  }
  fetchAllComments = () => {
    api.comments.getComments()
    .then(data => {
      console.log(data)
      this.setState({ 
        comments: data
      })
    })
  };

  sortComments = (value) => {
    console.log("SORT METHOD HERE")
    let arr = [];
    if (value === "Old") {
      arr = this.state.comments.sort((a, b) => a.created_at > b.created_at ? 1 : -1)
    }
    else if (value === "New") {
      arr = this.state.comments.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
    }
    this.setState({
      comments: arr
    })
  };

    render() {
      let { media_id } = this.props.match.params
      return(
      <div>
        <AddCommentForm 
        media_id={this.props.match.params}
        fetchAllComments={this.fetchAllComments}
        currentUser={this.props.currentUser}
        // bring down media id that was clicked
        />
        {/* need conditional if no comments, alert message or else there's a "cannot map through error" */}
        <strong>Sort by:</strong>
            <label>
                <input type="radio" value="Old" checked={null} onChange={(e) => this.sortComments(e.target.value)}/>
                Old
            </label>
            <label>
                <input type="radio" value="New" checked={null} onChange={(e) => this.sortComments(e.target.value)}/>
                 New
            </label><br></br>
        <ListGroup variant="flush">
          {this.state.comments.map(c => {
            if (media_id == c.media.id) {
            return <ListGroup.Item key={c.id}>
              {c.feedback} 
              <br></br>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  submitted by a <cite>{c.user.instrument}</cite>
                  &nbsp;player
                </small>
              </footer>
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