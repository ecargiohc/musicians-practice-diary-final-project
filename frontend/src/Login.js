import React from 'react';
import './Login.css';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            token: ""
        };
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        this.fetchData();
    };

    fetchData() {

    }

    login = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
        })
        .then(res => res.json())
        .then(json => {
            localStorage.setItem('token', json.jwt)
        })
    }
    
    render() {
        return (
            <div className="center">
                hello?!
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={(event) => this.login(event)}>
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    };
}
export default Login;