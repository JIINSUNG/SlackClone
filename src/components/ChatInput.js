import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
function ChatInput({ ChannelName, ChannelId, chatRef }) {
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault(); // 새로고침 방지

    if (!ChannelId) {
      return false;
    }
    const docRef = doc(db, "rooms", ChannelId);
    const subRef = collection(docRef, "messages");
    addDoc(subRef, {
      message: input,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });
    // 참고 자료 https://stackoverflow.com/questions/70551249/firebase-v9-add-subcollection-to-existing-doc

    //구버전
    // db.collection('rooms').doc(ChannelId).collection('messages').add({
    //     message: input,
    //     timestamp : firebase.firestore.FieldValue.serverTimestamp(),
    //     user : "insung",
    //     userImage : "",
    // });

    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });

    setInput("");
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${ChannelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none; // 전송버튼을 감춤, 사용자가 엔터를 누르면 감춰진 버튼이 눌려져 메세지가 전송됨
  }
`;
