import React from 'react';
import { Form } from 'semantic-ui-react';
import { api } from '../services/api';

class SignUpForm extends React.Component {
    state = {
        username: "",
        password: "", 
        instrument: "",
        resume: "", 
        photo: ""
    }

    handleInstrument = (e, d) => {
        const key = d.name;
        const value = d.value;
        switch (key) {
            case 'username':
                return this.setState({
                    username: value
                })
                case 'password': 
                return this.setState({
                    password: value
                })
            case 'instrument':
                return this.setState({
                    instrument: value
                })
            case 'resume':
                return this.setState({
                    resume: value
                })
            case 'photo':
                return this.setState({
                    photo: value
                })
            default:
                return null;
        };
    };
    // handleChange = (e) => {
    //     this.setState({[e.target.name]: e.target.value})
    // };
    // handleInstrument = (e) => {
        //     this.setState=({instrument: e.target.value})
        // };
        
    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password,
                    instrument: this.state.instrument,
                    resume: this.state.resume,
                    photo: this.state.photo
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            alert(`Welcome ${this.state.username}! Go ahead and log in with your new username and password :)`)
            this.props.history.push('/login')         
     })
    };
    
    render() {
        const options = [
            { key: 'violin', text: 'Violin', value: 'violin' },
            { key: 'viola', text: 'Viola', value: 'viola' },
            { key: 'cello', text: 'Cello', value: 'cello' },
            { key: 'bass', text: 'Bass', value: 'bass' },
            { key: 'harp', text: 'Harp', value: 'harp' },
            { key: 'flute', text: 'Flute', value: 'flute' },
            { key: 'oboe', text: 'Oboe', value: 'oboe' },
            { key: 'clarinet', text: 'Clarinet', value: 'clarinet' },
            { key: 'bassoon', text: 'Bassoon', value: 'bassoon' },
            { key: 'horn', text: 'Horn', value: 'horn' },
            { key: 'trumpet', text: 'Trumpet', value: 'trumpet' },
            { key: 'saxophone', text: 'Saxophone', value: 'saxophone' },
            { key: 'trombone', text: 'Trombone', value: 'trombone' },
            { key: 'timpani', text: 'Timpani', value: 'timpani' },
            { key: 'percussion', text: 'Percussion', value: 'percussion' }
          ]
        return(
            <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Input
                style={{width: "140px"}}
                fluid label="Username" 
                placeholder="Create a Username" 
                name="username" 
                onChange={(e, d) => this.handleInstrument(e, d)}/>
                <Form.Input 
                style={{width: "140px"}}
                fluid label="Password" 
                placeholder="Create a Password" 
                name="password" 
                onChange={(e, d) => this.handleInstrument(e, d)}/>

                {/* this form below needs to take in value and store it to state */}
            <Form.Select
            style={{width: "150px"}}
            fluid
            label='Instrument'
            name='instrument'
            options={options}
            placeholder='Your Instrument'
            onChange={(e, d) => this.handleInstrument(e, d)}
          />

                <Form.Input 
                style={{width: "130px"}}
                fluid label="Resume" 
                placeholder="resume file" 
                name="resume" 
                // value={this.state.resume} 
                onChange={(e, d) => this.handleInstrument(e, d)}/>
                <Form.Input 
                style={{width: "130px"}}
                fluid label="Photo" 
                placeholder="photo file" 
                name="photo" 
                onChange={(e, d) => this.handleInstrument(e, d)}/>
            </Form.Group>
            <Form.Button>Submit</Form.Button>
        </Form>
            )
    };
}
export default SignUpForm;