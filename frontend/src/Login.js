import React from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import { api } from './services/api';
import SignUpForm from './components/SignUpForm';
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
            console.log("this is the login component", res)
            if (!res.error) {
                const updatedState = {...this.state.auth, user: res};
                this.props.handleLogin(res);
                this.props.history.push('/'); 
            } else {
                this.setState({error: true})
            }
        })
    };
    
    render() {
        const {fields} = this.state
        // console.log(this.props)
        return (
            <div className="center">
                {this.state.error ? <h1>Try again!</h1> : null}
                <div className="card">
                    <h1>Musician Login</h1>
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
                        /><br></br>
                        <Link 
                            to='/new_user' 
                        >Don't have an account?</Link>
                    </form>
                </div>
            </div>
        );
    }
};
export default Login;