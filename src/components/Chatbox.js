import React from 'react';
import firebase from '../firebase';

 
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
   
}



        
  
export default Chatbox;