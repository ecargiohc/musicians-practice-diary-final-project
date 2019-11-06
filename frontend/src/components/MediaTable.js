import React, { Component } from "react";
import { Link } from "react-router-dom";
import MediaSearchBar from "./MediaSearchBar";
import { Button } from 'semantic-ui-react';

import { Embed } from 'semantic-ui-react'

class MediaTable extends Component {
    state = {
        displayMedia: []
    }
    
componentDidMount() {
    // this.fetchDelete();
};
fetchDelete = (event) => {
    event.preventDefault();
    // debugger
    if (event) {
    // console.log(event.target.id)
    fetch(`http://localhost:3000/media/${event.target.id}`, {
    method: "DELETE", 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        mode: "no-cors"
        }
    })
    .then(response => response.json())
    .then(this.props.deleteMedia(event.target.id))
    .catch(err => alert(err))
    }
};
addComment = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/comments", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            mode: "no-cors"
        }
    }).then(response => response.json())
    .then(data => this.props.fetchComments())
};

    render() {
        // console.log("media", this.props.media)
        // console.log("display", this.props.displayMedia)
        return (
        <table>
            <thead>
            <tr>
                <th>Title</th>
                <th>Link</th>
                <th>Author</th>
            </tr>
            </thead>
            <tbody>
            {this.props.displayMedia.length > 0 ? (
                this.props.displayMedia.map(m => (
                <tr key={m.id}>
                    {/* or allow them to upload file */}
                    <td>{m.name}</td>
                    <a href={m.url} target="_blank">{m.url}</a>
                    <td>{m.user.username}</td>
                    <td>
                    <button className="button muted-button">Edit</button>
                    <button className="button muted-button" id={m.id} onClick={(event) => this.fetchDelete(event)}>Delete</button>
                    {/* <Link to={`/comments/${m.id}`}>Comment</Link> */}
                    <Button as={Link} to="/add_comment">
                    Add Comment
                    </Button>
                    {/* <Link to={'/add_comment'}>Add Comment</Link> */}
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={3}>No media</td>
                </tr>
            )}
            </tbody>
        </table>
        )
      };
};
export default MediaTable;