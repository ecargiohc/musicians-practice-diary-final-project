import React, { Component } from 'react';
import AddSubTaskForm from '../components/AddSubTaskForm';


// ///NOT USING THIS FILE ANYMORE
class SubTaskContainer extends Component {
    constructor() {
        super();
        this.state = {
            sub_tasks: []
        }
    };
    
    // componentDidMount() {
    //     this.fetchSubTasks();
    //   };
    //   fetchSubTasks = () => {
    //     fetch("http://localhost:3000/api/v1/sub_tasks")
    //       .then(resp => resp.json())
    //       .then(data => {
    //         this.setState({
    //           sub_tasks: data
    //         });
    //       });
    //   };

    render() {
        return(
            <div>
              ADDSUBTASKFORM
              <AddSubTaskForm />
            {this.state.sub_tasks.map(s => {
                return <ul>
                    tempo: {s.tempo}<br></br>
                    artic: {s.articulation}<br></br>
                    dynamics: {s.dynamics}<br></br>
                    phrasing: {s.phrasing}<br></br>
                    style: {s.style}<br></br>
                    pitch: {s.intonation}<br></br>
                </ul>
            })}
            </div>
        )
    }
}
export default SubTaskContainer;