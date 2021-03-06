import React, { Component } from "react";
import { Link } from "react-router-dom";
import MediaSearchBar from "./MediaSearchBar";
import { Button } from 'semantic-ui-react';

import { Embed } from 'semantic-ui-react'

class MediaTable extends Component {
    state = {
        displayMedia: []
    };
    
fetchDelete = (event) => {
    event.preventDefault();
    // debugger
    if (event) {
    // console.log(event.target.id)
    fetch(`http://localhost:3000/api/v1/media/${event.target.id}`, {
    method: "DELETE", 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        mode: "no-cors", 
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(this.props.deleteMedia(event.target.id))
    .catch(err => console.log(err))
    }
};
addComment = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/v1/comments", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            mode: "no-cors", 
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(response => response.json())
    .then(data => this.props.fetchComments())
};

    render() {
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
                    {/* allow them to upload file */}
                    <td>{m.name}</td>
                    <a href={m.url} target="_blank">{m.url}</a>
                    <td>{m.user.username}</td>
                    <td>
                    {/* <button className="button muted-button">Edit</button> */}
                    <button className="button muted-button" id={m.id} onClick={(event) => this.fetchDelete(event)}>Delete</button>
                    <Link id={m.id} to={`/view_add_comment/${m.id}`}>View/Add Comment</Link>
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