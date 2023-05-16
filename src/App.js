import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// components

import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import PageNotFound from "./pages/PageNotFound"

import {UserContext} from "./context/UserContext"
import Header from "./layout/Header";
import Footer from "./layout/Footer";

import firebaseConfig from "./config/firebaseConfig";
// init firebase
firebase.initializeApp(firebaseConfig);

const App = () => {

  const [user, setUser]= useState(null);

  return (
    <Router>
      <ToastContainer/>
      <UserContext.Provider value={{user, setUser}}>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        <Footer/>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
