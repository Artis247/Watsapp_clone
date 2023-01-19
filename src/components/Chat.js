import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import { InsertEmoticon } from '@material-ui/icons'
import MicIcon from '@material-ui/icons/Mic'
import db from '../firebase'
import { useParams } from 'react-router-dom'
import { useStateValue } from './Stateprovider'
import firebase from "firebase/compat/app"


const Chat = () => {

    const[seed,setSeed]=useState("")
    const[input,setInput]=useState("")
    const{roomId}=useParams()
    const[roomName,setRoomName]=useState('')
    const[messages,setMessages]=useState([])
    const[{user},dispatch]=useStateValue()

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name)
            ))
            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp","asc")
                .onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>doc.data())))
        }
    },[roomId])
    


useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000))
},[])

const sendMessage=(e)=>{
    e.preventDefault()
    db.collection('rooms').doc(roomId).collection('messages').add({
        message:input,
        name:user.displayName,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput(" ")


}

  return (
    <div className='chat'>
        <div className='chat_header'>
              <Avatar src={` https://avatars.dicebear.com/api/human/b${seed}.svg`} />
              <div className='sidebarchatinfo'>
                 <h2>{roomName}</h2>
                 <p>last Seen {" "}
                    {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                 </p>
              </div>
              <div className='sidebarchatright'>
              <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
              </div>

        
        </div>
        <div className='chat_body'>
            {messages.map(message=>(
                  <p className={`chat_message ${message.name===user.displayName && 'chat_receiver'}`}>
                  <span className="chat_name">{message.name}</span>
                  {message.message}
                  <span className='chat_timestamp'>
                      {new Date(message.timestamp?.toDate()).toUTCString()}
                  </span>
              </p>
             

            ))}
      
            
        </div>
        <div className='chat_footer'>
            <InsertEmoticon />
            <form>
                <input value={input} onChange={e=>setInput(e.target.value)} placeholder='type a message' type="text" />
                <button onClick={sendMessage} type="submit">Send a Message</button>
            </form>
            <MicIcon />
        </div>
        
    </div>
  )
}

export default Chat