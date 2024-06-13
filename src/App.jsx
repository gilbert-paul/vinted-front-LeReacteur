import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios"

import Header from './components/Header';
import Home from './pages/Home/index.jsx'
import Signup from './pages/Signup/index.jsx'
import Offer from './pages/Offer/index.jsx';
import Login from './pages/Login/index.jsx';
import Footer from './components/Footer';
import Modal from "./components/Modal.jsx"
import { useState } from 'react';
import Cookies from "js-cookie"


function App() {
  const url = import.meta.env.VITE_APP_BACK_URL
  const [modalIsVisible, setModalIsVisible] = useState({login:false,signup:false})

  if(modalIsVisible.signup || modalIsVisible.login){
    document.body.style.overflowY="hidden"
  } else {
    document.body.style.overflowY="initial"

  }

  return (
    <Router>
          <Header modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible}/>
      <Routes>
        
        <Route path="/" element={<Home url={url} />}/>
        <Route path="/offer/:id" element={<Offer url={url} />}/>
        <Route path="/user/signup" element={<Signup url={url} />}/>
        <Route path="/user/login" element={<Login url={url} />}/>


      </Routes>
      <Footer/>
      {modalIsVisible.login && <Modal content={<Login url={url} setModalIsVisible={setModalIsVisible} />} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible}/>}
      {modalIsVisible.signup && <Modal content={<Signup setModalIsVisible={setModalIsVisible} url={url}/>} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible}/>}
    </Router>
  )
}

export default App
