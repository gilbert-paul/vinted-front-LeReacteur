import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios"

import Header from './components/Header';
import Home from './pages/Home/index.jsx'
import Signup from './pages/Signup/index.jsx'
import Offer from './pages/Offer/index.jsx';
import Login from './pages/Login/index.jsx';
import Footer from './components/Footer';
import { useState } from 'react';
import Cookies from "js-cookie"


function App() {
  const url = import.meta.env.VITE_APP_BACK_URL
  const [token, setToken] = useState("")
 

  return (
    <Router>
          <Header token={token} setToken={setToken}/>
      <Routes>
        
        <Route path="/" element={<Home url={url} />}/>
        <Route path="/offer/:id" element={<Offer url={url} />}/>
        <Route path="/user/signup" element={<Signup url={url} />}/>
        <Route path="/user/login" element={<Login url={url} />}/>


      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
