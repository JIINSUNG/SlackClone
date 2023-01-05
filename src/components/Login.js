import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider, signInWithPopup } from "../firebase";
function Login() {
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((error) => alert(error));
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://play-lh.googleusercontent.com/VfpdFf3jaMj51B84gO8yiOtlp9ezTU0ByQ9UK6SIEvAiv5NDOgy7DYRzgbpCnETnX6s"
          alt=""
        />
        <h1>Sign In to the Insung's SlackClone</h1>
        <p>Made by Insung</p>
        <Button onClick={signIn}>Sign in With Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  /* grid */
  place-items: center;
  /* place-items */
`;
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    /* object-fit */
    height: 100px;
    margin-bottom: 40px;
  }

  > Button {
    margin-top: 50px;
    text-transform: inherit;
    /* inherit */
    background-color: #0a8d48;
    color: white;
  }
`;
