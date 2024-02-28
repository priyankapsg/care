/** @format */

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Loginscreen from "../pages/Loginscreen";
import Registerscreen from "../pages/Registerscreen";
import Admin from "../pages/Admin";
import HelpReceiverDashboard from "../pages/Helpreceiver";

const AppRouters = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Loginscreen />} />
      <Route path='/register' element={<Registerscreen />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/help_reciever' element={<HelpReceiverDashboard />} />
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRouters;
