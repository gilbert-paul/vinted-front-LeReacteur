import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios"

import Header from './components/Header';
import Home from './pages/Home/index.jsx'
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import Offer from './pages/Offer/index.jsx';


function App() {
  const url = import.meta.env.VITE_APP_BACK_URL
 

  return (
    <Router>
          <Header/>
      <Routes>
        
        <Route path="/?page=1&limit" element={<Home url={url} />}/>
        <Route path="/offer/:id" element={<Offer url={url} />}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
