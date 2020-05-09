import React, { Component } from 'react';
import AddMediaForm from '../components/AddMediaForm';
import MediaTable from '../components/MediaTable';
import MediaSearchBar from '../components/MediaSearchBar';
// 11/11: 11:30a
import { api } from "../services/api";

class MediaContainer extends Component {
    constructor() {
        super();
        this.state = {
                media: [],
                comments: [],
                displayMedia: []
        }
    };

    componentDidMount() {
        this.fetchAllMedia();
    }
    fetchAllMedia = () => {
        api.media.getMedia()
        .then(data => {
          console.log(data)
          this.setState({ 
            media: data,
            displayMedia: data
          })
        })
    };

    deleteMedia = id => {
        let newMedia = this.state.media.slice()
        const updatedMedia = newMedia.filter(m => m.id != id)
        this.setState({
            media: updatedMedia,
            displayMedia: updatedMedia
        }, () => console.log(this.state))
    };

    filterMedia = (type) => {
        // console.log("displayedMedia", this.state.displayMedia);
        // console.log("media", this.state.media);
        // haddebugger;
        if (type !== "All") {
            let array = this.state.media.filter(med => {
                return med.user.instrument === type
            }
                );
            // console.log(array)
            
            this.setState({
                displayMedia: array
              })
            }
            else {
                // alert message?
              this.setState({
                displayMedia: this.state.media
              })
            };
    };

    sortMedia = (value) => {
        console.log("SORT METHOD HERE")
        let arr = [];
        if (value === "Old") {
          arr = this.state.displayMedia.sort((a, b) => a.created_at > b.created_at ? 1 : -1)
        }
        else if (value === "New") {
          arr = this.state.displayMedia.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
        }
        this.setState({
          displayStocks: arr
        })
      };

    render() {
        return(
            <div className="container">
                <div className="flex-row">
                    <div className="flex-large">
                    <h2>Add Media</h2>
                    <AddMediaForm 
                    fetchAllMedia={this.fetchAllMedia}
                    currentUser={this.props.currentUser}
                    />
                    </div>
                    <div className="flex-large">
                    <h2>View All Media</h2>
                    <MediaSearchBar 
                    // media={this.state.media} 
                    sortMedia={this.sortMedia}
                    filterMedia={this.filterMedia}/>
                    <MediaTable 
                    media={this.state.media} 
                    displayMedia={this.state.displayMedia}
                    // delete only works on refresh
                    deleteMedia={this.deleteMedia}
                    // link to comment container
                    />
                    </div>
                </div>
            </div>
        )
    }
}
export default MediaContainer;