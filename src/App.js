import React from "react";
import "./App.css";
import Header from "./components/Header";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Spinner from "react-spinkit";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Link,
} from "react-router-dom";

function App() {
  const [user, loading] = useAuthState(auth);
  // 자원 로딩시, 브랜드로고 + 스핀화면 표시기능 구현
  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://play-lh.googleusercontent.com/VfpdFf3jaMj51B84gO8yiOtlp9ezTU0ByQ9UK6SIEvAiv5NDOgy7DYRzgbpCnETnX6s"
            alt=""
          />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <Router>
    //사용자 정보가 있는지 확인후 없다면 로그인화면으로 있다면 화면 표시
      {!user ? (
        <Login />
      ) : (
        <>
          <Header /> 
          <AppBody>
            <Sidebar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Chat />
                  </>
                }
              />
            </Routes>
          </AppBody>
        </>
      )}
    </Router>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
