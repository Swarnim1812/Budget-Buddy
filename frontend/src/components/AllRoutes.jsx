import React from 'react';
import Landingpage from './Landingpage';
import Homepage from './Homepage';
import Login from './Login';
import Forgotpassword from './Forgotpassword';
import Resetpassword from './Resetpassword';
import Signup from './Signup';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Searchitempage from './Searchitempage';
import Display from './Display';
import Navbar from "./Navbar";
import { UserContextProvider } from './userContex';
import Navigation from "../Navigation/Nav";
import Otpverify from './Otpverify';
const AllRoutes = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/search' element={<Navigation/>} />
          <Route path='/collections' element={<Homepage />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgotpwd' element={<Forgotpassword />} />
          <Route path='/user/resetPassword/:token' element={<Resetpassword />} />
          <Route path='/searchitempage/:expectedPrice' element={<Searchitempage />} />
          <Route path='/display' element={<Display />} />
          <Route path='/otpVerify' element={<Otpverify />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default AllRoutes