import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase.js';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: null
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        const {email, username, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() =>{
            const user = firebase.auth().currentUser;
            user.updateProfile({displayName: username}).then(() =>{
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({error});
            });
        })
        .catch(error => {
            this.setState({error});
        })
    }
    render() {
        const {email, username, password, error} = this.state;
        return (
            <div className="auth-container bg-gradient-to-br from-green-400 to-blue-400 py-10 px-6">
              <h1 className="text-3x1 text-white text-center font-bold mb-4">Register your account</h1>
              {error && <p className="error-message">{error.message}</p>}
              <form onSubmit={this.handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                <label htmlFor="username" className="block text-white">Username</label>
                <input type="text" name="username" id="username" value={username} onChange={this.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"></input>
                </div>
                <div className="mb-4">
                <label htmlFor="email"className="block text-white">Email address</label>
                <input type="text" name="email" id="email" value={email} onChange={this.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"></input>
                </div>
                <div className="mb-4">
                <label htmlFor="password" className="block text-white">Choose a password</label>
                <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={this.handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                ></input>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Get started</button>
                <p className="mt-4 text-gray-600">Already have an account? <Link className="text-blue-500" to="/login">Login here</Link></p>
              </form> 
            </div>
        )
    };
}
export default Register;