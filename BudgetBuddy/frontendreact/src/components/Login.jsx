import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from "./userContex";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userContext = useUserContext();
  
  async function loginuser(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/user/login", {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      window.alert("Login Successful");
      response.json().then(userInfo => {
        userContext.login(userInfo);
        navigate('/');
      })
    }
    else {
      alert('Wrong Credentials');
    }
  }
  return (
    <div className='log_in'>
      <div className='loginpage'>
        <div className='logincard'>
          <h1>Log In</h1>
          <form method="post" className='loginform'>
            <div className='form-group'>
              <input
                className='forminput'
                type='text'
                name='email'
                id='email'
                autoComplete='off'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your Email'
              />
            </div>
            <div className='form-group'>
              <input
                className='forminput'
                type='text'
                name='password'
                id='password'
                autoComplete='off'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
            </div>
            <div className='form-group form-button'>
              <input
                type='submit'
                name='signin'
                id='signin'
                className='signinbtn'
                value='LOG IN'
                onClick={loginuser}
              />
            </div>
            <div className='loginfooter'>
              <NavLink to="/signup" className='alreadyacc'>Create New Account</NavLink>
              <NavLink to="/forgotpwd" className='alreadyacc'>Forgot Password?</NavLink>
            </div>
          </form>
          <br />
        </div>
      </div>
    </div>
  )
}

export default Login