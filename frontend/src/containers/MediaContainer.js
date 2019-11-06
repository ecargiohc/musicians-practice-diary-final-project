import React, { Component } from 'react';
import CommentContainer from './CommentContainer';
import AddMediaForm from '../components/AddMediaForm';
import MediaTable from '../components/MediaTable';
import MediaSearchBar from '../components/MediaSearchBar';

class MediaContainer extends Component {
    constructor() {
        super();
        this.state = {
                media: [],
                comments: [],
                displayMedia: {}
        }
    };

    componentDidMount() {
        this.fetchMedia();
      };
    fetchMedia = () => {
        fetch("http://localhost:3000/media")
            .then(resp => resp.json())
            .then(data => {
            this.setState({
                media: data
            });
        });
    };

    deleteMedia = id => {
    console.log(id)
    this.setState({
        media: this.state.media.filter(m => m !== id)
    })
    };

    fetchComments = () => {
        fetch("http://localhost:3000/media")
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                comments: data })
        })
    };

    filterMedia = (type) => {
        if (type !== "All") {
            this.setState({
                displayMedia: this.state.media.user.filter(u => u.instrument === type)
              })
            }
            else {
              this.setState({
                displayMedia: this.state.media.user.instrument
              })
            };
    };

    render() {
        return(
            <div className="container">
                <div className="flex-row">
                    <div className="flex-large">
                    <h2>Add Media</h2>
                    <AddMediaForm 
                    fetchMedia={this.fetchMedia}
                    />
                    </div>
                    <div className="flex-large">
                    <h2>View All Media</h2>
                    <MediaSearchBar 
                    // media={this.state.media} 
                    filterMedia={this.filterMedia}/>
                    <MediaTable 
                    media={this.state.media} 
                    // delete only works on refresh
                    deleteMedia={this.deleteMedia}
                    fetchComments={this.fetchComments}
                    // link to comment container
                    />
                    </div>
                </div>
            </div>
        )
    }
}
export default MediaContainer;