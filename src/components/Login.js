import React from 'react';
import firebase from '../firebase.js';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            error: null,
        };
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({error});
        })
    }
    render() {
        const {email, password, error} = this.state;
        return (
            <div class=" auth-containe bg-gradient-to-r from-purple-500 to-pink-500 py-8 px-6">
                <h1 class="text-white text-center font-bold mb-4">Login</h1>
                <p class="text-white text-center mb-4">Login to access your account</p>
                {error && <p class="text-red-500 mb-4">{error.message}</p>}
                <form onSubmit={this.handleSubmit} className="max-w-md mx-auto">
                    <div class="flex flex-col mb-4">
                    <label class=" text-white mb-2" htmlFor="email">Email address</label>
                    <input class="w-full p-2 border border-gray-300 rounded" type="text" name="email" id="email" value={email} onChange={this.handleChange}></input>
                    </div>
                    <div class="flex flex-col mb-4">
                    <label class="text-white mb-2" htmlFor="password">Password</label>
                    <input class="p-2 border border-gray-300 rounded"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    >
                    </input>
                    </div>
                    <button class=" mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" type="submit">Login</button>
                    <p class="mt-4 text-black">Don't have an account? <Link class="text-blue-500" to="/register">Register here</Link></p>
                </form>
            </div>
        );
    }
}
export default Login;