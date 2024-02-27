import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './main.css';
import Home from "./pages/Home.jsx";
import Loginscreen from "./pages/Loginscreen.jsx"; 
import Travelers from "./components/Travelers.jsx";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/about.jsx";
import Registerscreen from "./pages/Registerscreen.jsx";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar/>
        <Header/> 
        <About/>
        <Travelers/>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travelers" element={<Travelers />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/register" element={<Registerscreen />} />
        </Routes>
        
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
