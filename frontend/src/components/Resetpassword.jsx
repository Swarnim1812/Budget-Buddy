import React, { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";

const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/user/resetPassword/" + token, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
      })
    });
    if (res.ok) {
      window.alert('Password Changed');
      console.log('Password Changed');
      navigate('/login');
    }
    else if (res.status === 400) {
      const data = await res.json();
      console.log(data);
      window.alert(data.error.message);
    }
  };
  return (
    <div class="resetpwdcontainer">
      <div className='resetcard'>
        <h2>RESET YOUR PASSWORD</h2>
        <form className='resetform' onSubmit={submitForm}>
          <input
            type="password"
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
            className='forminput2'
            name="password"
            placeholder='New Password'
            required
          />
          <button type="Submit" className='resetbtn'>RESET</button>
          <NavLink to="/login" className='resettologin'><GoArrowLeft />Go Back</NavLink>
        </form>
      </div>
    </div>

  );
}

export default Resetpassword