import React from 'react';
import firebase from '../firebase';
import { UserAuth } from '../context/AuthContext'

function ChatboxContent({ chats }) {
    const currentUser = UserAuth().currentUser;
  
    return (
      <div className="chatbox pb-44 pt-20 containerWrap">
        <ul className="chat-list px-16">
          {chats.sort((a, b) => a.date - b.date).map(chat => {
            const postDate = new Date(chat.date);
  
            return (
              <li key={chat.id} className={`chat ${chat.user === currentUser.displayName ? "chat-start" : "chat-end"
              }`}>
                <div className="chat-header inline">
                  {chat.user}
                  <time className="text-xs opacity-50 inline">
                    {-postDate.getDate()}/{postDate.getMonth() + 1}
                  </time>
                </div>
                <div className="chat-bubble inline">{chat.message}</div>
              </li>
            );
            
          })}
        </ul>
      </div>
    );
  }
 
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
                    id: chat,
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
    return <ChatboxContent chats={this.state.chats} />;
  }
}
  
  
export default Chatbox;