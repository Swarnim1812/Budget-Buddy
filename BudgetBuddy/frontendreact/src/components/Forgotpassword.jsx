import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { GoArrowLeft } from "react-icons/go";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/user/forgotPassword", {
      email,
    }).then(res => {
      if (res.data.status) {
        alert("check your email for reset password link");
        navigate('/login');
      }
      console.log(res.data)
    }).catch(err => {
      window.alert(err.response.data.message);
      console.log(err);
    })
  };

  return (
    <div class="resetpwdcontainer">
      <div className='resetcard'>
        <h2>PASSWORD RESET</h2>
        <form className='resetform' id="password-reset-form" method="post" onSubmit={submitForm}>
          <input
            type="email"
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)}
            className='forminput'
            name="email"
            placeholder='Your Email'
            required
          />
          <button type="submit" className='resetbtn'>SEND</button>
          <NavLink to="/login" className='resettologin'><GoArrowLeft className='backarrow' />Go Back</NavLink>
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword