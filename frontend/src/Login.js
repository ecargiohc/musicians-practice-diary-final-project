import React from 'react';
import './Login.css';

import { api } from './services/api';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            fields: {
                username: "",
                password: "",
                // token: ""
            }
        }
    };

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({fields: newFields})
    };
    
    handleSubmit = (e) => {
        console.log("LOGIN")
        e.preventDefault();
        api.auth.login(this.state.fields).then(res => {
            if (!res.error) {
                const updatedState = {...this.state.auth, user: res};
                this.props.handleLogin(res);
                this.props.history.push('/'); 
            } else {
                this.setState({error: true})
            }
        })
    };

    // login = (e) => {
    //     e.preventDefault()
    //     fetch('http://localhost:5000/login', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             user: {
    //                 username: this.state.username,
    //                 password: this.state.password
    //             }
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(json => {
    //         localStorage.setItem('token', json.jwt)
    //     })
    // };
    
    render() {
        const {fields} = this.state
        // console.log(this.props)
        return (
            <div className="center">
                hello?!
                {this.state.error ? <h1>Try again!</h1> : null}
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            onChange={this.handleChange} value={fields.username}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}value={fields.password}
                        />
                        <input
                            className="form-submit"
                            value="Login!"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }
};
export default Login;