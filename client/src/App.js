import logo from './logo.svg';
import { useState,useEffect } from "react";
import React from "react";
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TopSale from './Components/TopSale';
import Revenue from './Components/Revenue';
import AddSales from './Components/AddSales';
import Navbar from './Components/Navbar';
import  Logout  from './Components/Logout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route exact path ="/" element = {<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
        <Route exact path ="/login" element = {<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
        <Route exact path ="/register" element = {<Register />}></Route>
        <Route exact path ="/addSales" element = {<AddSales/>}></Route>
        <Route exact path ="/topSales" element = {<TopSale />}></Route>
        <Route exact path ="/revenue" element = {<Revenue />}></Route>
        <Route exact path ="/logout" element = {<Logout isLoggedIn={isLoggedIn} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
