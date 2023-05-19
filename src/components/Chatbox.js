import React from 'react';
import firebase from '../firebase';
import { render } from '@testing-library/react';

class Chatbox extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
        chats: []
    }
   }
   componentDidMount() {
    const chatRef = firebase.database().ref('general');
    chatRef.on('value', snapshot => {
        const getChats = snapshot.val();
        let ascChats = [];
        for (let chat in getChats) {
            if(getChats[chat].message !== ''){
                ascChats.push({
                    id:chat,
                    message: getChats[chat].message,
                    user: getChats[chat].user,
                    date: getChats[chat].timestamp
                });
            }
        }
    const chats = ascChats.reverse();
    this.setState({chats});    
    });
   }
   render() {
    return (
      <div className="chatbox">
              <ul className="chat-list bg-gray-200 p-4 rounded-lg">
                  {this.state.chats.map((chat) =>{
                      const postDate = new Date(chat.date);
                      return(
                          <li key={chat.id} className="flex mb-2">
                              <em className="mr-2 text-gray-600">{postDate.detDate() + '/' + (postDate.getMonth() +1)}</em>
                              <strong className="mr-2 text-blue-500">{chat.user}:</strong>
                              <span className="text-gray-800">{chat.message}</span>
                          </li>
                      )
                  })}
              </ul>
          </div>
    ) 
    }
}



        
  
export default Chatbox;