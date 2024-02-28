/** @format */

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Loginscreen from "../pages/Loginscreen";
import Registerscreen from "../pages/Registerscreen";


const AppRouters = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Loginscreen />} />
      <Route path='/register' element={<Registerscreen />} />
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRouters;
