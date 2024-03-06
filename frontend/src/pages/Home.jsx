/** @format */

import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Travelers from "../components/Travelers";
import About from "../components/about";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <About /> 
      <Travelers /> 
      <Footer />
    </>
  );
};

export default Home;
