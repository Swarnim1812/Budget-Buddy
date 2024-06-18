import React from 'react';
import Landingpage from './Landingpage';
import Homepage from './Homepage';
import Details from './Details1';
import Forget from './Forget';
import Forget2 from './Forget2';
import Login from './Login';
import Forgotpassword from './Forgotpassword';
import Resetpassword from './Resetpassword';
import Signup from './Signup';
import Logout from './Logout';
import Verifyemail from './Verifyemail';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Searchitempage from './Searchitempage';
import Display from './Display';
import Navbar from "./Navbar";
import { UserContextProvider } from './userContex';
const AllRoutes = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/collections' element={<Homepage />} />
          <Route path='/details' element={<Details />} />
          <Route path='/forget' element={<Forget />} />
          <Route path='/forget2' element={<Forget2 />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/forgotpwd' element={<Forgotpassword />} />
          <Route path='/user/resetPassword/:token' element={<Resetpassword />} />
          <Route path='/verifyemail' element={<Verifyemail />} />
          <Route path='/searchitempage/:expectedPrice' element={<Searchitempage />} />
          <Route path='/display' element={<Display />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
}

export default AllRoutes