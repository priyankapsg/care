/** @format */

import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Travelers from "../components/Travelers"; // Assuming you have a component named Services
import About from "../components/about";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <About /> 
      <Travelers /> {/* Replace Travelers with Services */}
      {/* Assuming you have a component named About */} {/* Assuming you have a component named Contact */}
      <Footer />
    </>
  );
};

export default Home;