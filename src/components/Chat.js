import  InfoOutlinedIcon  from '@material-ui/icons/InfoOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import React, { useEffect } from 'react'
import styled from 'styled-components';
import { selectRoomId } from '../features/counter/appSlice';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput'; 
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { collection, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Message from './Message';
import { useRef } from 'react';

function Chat() {
    const chatRef =  useRef(null);
    const roomId =  useSelector(selectRoomId);
    console.log(roomId);
    const [roomDetails] = useDocument(
        roomId && doc(db,'rooms',roomId)
        // db.collection("rooms").doc(roomId)

    );
    const [roomMessages, loading] = useCollection(

        roomDetails && query(collection(doc(db,'rooms',roomId), "messages"), orderBy('timestamp','asc'))

        // db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','ASC')
        )

    useEffect(()=> {
        chatRef?.current?.scrollIntoView({
            behavior : "smooth",
        });

    },[roomId,loading])

    console.log(roomDetails?.data());
    if (roomMessages)
        console.log(roomMessages);
  return (
    <ChatContainer>
        {roomDetails && roomMessages && (
            <>
                   <Header>
                   <HeaderLeft>
                       <h4><strong>#{roomDetails?.data().name}</strong></h4>
                       <StarBorderOutlinedIcon />
                   </HeaderLeft>
                   <HeaderRight>
                       <p>
                           <InfoOutlinedIcon />Details
                       </p>
                   </HeaderRight>
               </Header>
               <ChatMessage>
                   {/* List Out Message */}
                   {roomMessages?.docs.map(doc => {
                       const {message, timestamp,user, userImage} = doc.data();
       
                       return <Message 
                       key = {doc.id}
                       message = {message}
                       timestamp = {timestamp}
                       user = {user}
                       userImage = {userImage}
                       />
                   })}
               <ChatBottom ref = {chatRef} />
               </ChatMessage>
               <ChatInput 
               chatRef={chatRef}
               ChannelName={roomDetails?.data().name}
               ChannelId = {roomId}
               />
               </>
        )}
 
        </ChatContainer>
  )
}

export default Chat

const ChatMessage = styled.div``;

const ChatBottom = styled.div`
padding-bottom: 200px; 
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding : 20px;
    border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
display: flex;
align-items: center; 
> h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
}

> h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size : 18px;
}
`;
const HeaderRight = styled.div`
> p {
    display: flex;
    align-items: center;
    font-size: 14px;
}

> p > .MuiSvgIcon-root {
    margin-right : 5px;
    font-size: 16px;
}
`;

const ChatContainer = styled.div`
flex : 0.7;
flex-grow: 1;
overflow-y: scroll;
margin-top: 60px;
`;

