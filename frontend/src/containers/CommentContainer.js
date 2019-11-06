import React, { Component } from 'react';
import AddCommentForm from '../components/AddCommentForm';
import ViewComment from '../components/ViewComment';

class CommentContainer extends Component {
    constructor() {
        super();
        this.state = {
            comments: []
        }
    };

    componentDidMount() {
        this.fetchComments();
      };
      fetchComments= () => {
        fetch("http://localhost:3000/comments")
          .then(resp => resp.json())
          .then(data => {
            this.setState({
              comments: data
            });
          });
      };

    render() {
        return(
            <div>
                COMMENT CONTAINER
                <ViewComment 
                comments={this.state.comments}/>
                {/* <AddCommentForm 
                fetchComments={this.fetchComments}/> */}
            </div>
        )
    }
};
export default CommentContainer;