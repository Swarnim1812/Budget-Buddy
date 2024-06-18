import React, { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

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
    // Axios.post("http://localhost:5000/user/resetPassword/"+token, {
    //   password,
    // }).then(res => {
    //   if (res.data.status) {
    //     window.alert(res.data.message);
    //     navigate('/login');
    //   }
    // }).catch(err => {
    //   window.alert(err.response.data.message);
    //   console.log(err);
    // })
  };
  return (
    <div class="resetpwdcontainer">
      <div className='resetcard'>
        <h2>Reset Your Password</h2>
        <form className='resetform' onSubmit={submitForm}>
          <input
            type="password"
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
            className='forminput'
            name="password"
            placeholder='New Password'
            required
          />
          {/* <input
            type="password"
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
            className='forminput'
            name="Password"
            placeholder='Confirm Password'
            required
          /> */}
          <button type="Submit" className='resetbtn'>RESET</button>
          <NavLink to="/login" className='resettologin'>Go Back</NavLink>
        </form>
      </div>
    </div>

  );
}

export default Resetpassword