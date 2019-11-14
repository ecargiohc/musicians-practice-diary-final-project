import React from 'react';

const MediaSearchBar= (props) => {

    return(
        <div>
            <strong>Sort by:</strong>
            <label>
                <input type="radio" value="Old" checked={null} onChange={(e) => props.sortMedia(e.target.value)}/>
                Old
            </label>
            <label>
                <input type="radio" value="New" checked={null} onChange={(e) => props.sortMedia(e.target.value)}/>
                 New
            </label><br></br>

        <label>
            <strong>Filter: </strong>
            <select onChange={(e)=>props.filterMedia(e.target.value)}>
            <option value="All">All</option>
            <option value="violin">Violin</option>
            <option value="viola">Viola</option>
            <option value="cello">Cello</option>
            <option value="bass">Bass</option>
            <option value="harp">Harp</option>
            <option value="flute">Flute</option>
            <option value="oboe">Oboe</option>
            <option value="clarinet">Clarinet</option>
            <option value="bassoon">Bassoon</option>
            <option value="horn">Horn</option>
            <option value="trumpet">Trumpet</option>
            <option value="saxophone">Saxophone</option>
            <option value="trombone">Trombone</option>
            <option value="timpani">Timpani</option>
            <option value="percussion">Percussion</option>
            </select>
        </label>
        </div>
    )
};
export default MediaSearchBar;