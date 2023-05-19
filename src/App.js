import './App.css';
import React from 'react';
import Chatbox from './components/Chatbox';
import {Link} from 'react-router-dom';
import firebase from './firebase';

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        message:''
      };
    }

    onChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
    };

    onSubmit = (event) => {
      event.preventDefault();
      if(this.state.message !== ''){
        const chatRef = firebase.database().ref('general');
        const chat = {
          message: this.state.message,
          user: this.props.user.displayName,
          timestamp: new Date().getTime()
        }

        chatRef.push(chat);
        this.setState({message:''});
      }
    }
  render() {  
  return (
    <div className="App">
     <h1 className='text-7x1 font-bold text-center mb-8 text-gray-700'>Chat app</h1>

     {this.props.user && (
     <div className="allow-chat">
     <Chatbox items={this.state.items} />
     <form className="message-form" onSubmit={this.onSubmit}>
     <input 
     type="text"
     name="message"
     id="message"
     value={this.state.message}
     placeholder="Enter a message..."
     onChange={this.onChange}
     className="flex-grow mr-2 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg" />
     <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Send</button>
     </form>
     </div>
  )}
  {!this.props.user && (
    <div className="disallow-chat">
      <p>
        <Link to="/login" className="text-blue-500">Login</Link> or <Link to="/register" className="text-blue-500">Register</Link> to start chatting!
      </p>
    </div>  
  )}
    </div>
  
  );
 }
} 


export default App;
