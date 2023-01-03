import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Link,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </>
    </Router>

    
  );
}

function Home() {
  return <h2>Home</h2>;
}


export default App;
