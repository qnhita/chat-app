import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import firebase, {auth} from './firebase.js';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null}
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if(user){
        this.setState({user});
      }
    })
  }
  logOutUser = () => {
    firebase.auth().signOut()
    .then(window.location ="/");
  }
  render() {
    return (
         <Router>
          <div className="app">
            <nav className="main-nav">
              {!this.state.user &&
              <div>
               <Link to="/login">Login</Link>
               <Link to="/register">Register</Link>
              </div>
                }
               {this.state.user &&
                  <a href="#!" onClick={this.logOutUser}>Log out</a>
              }
            </nav>
            <Switch>
              <Route path="/" exact render={() =><App user={this.state.user}/>} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
            </Switch>
          </div>
         </Router>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(< AppRouter />);

reportWebVitals();
