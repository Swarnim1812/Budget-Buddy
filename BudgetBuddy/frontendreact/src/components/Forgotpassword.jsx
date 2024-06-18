import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Forgotpassword = () => {
  // const submitForm = (event) => {
  //   event.preventDefault();

  //   const newPassword = document.getElementById('new_password').value;
  //   const confirmPassword = document.getElementById('confirm_password').value;

  //   if (newPassword !== confirmPassword) {
  //     alert('Passwords do not match');
  //     return;
  //   }

  //   const form = new FormData(document.getElementById('password-reset-form'));
  //   const formData = {};
  //   form.forEach((value, key) => {
  //     formData[key] = value;
  //   });

  //   const password = {
  //     password: formData.password
  //   }

  //   const token = document.URL.split('/resetPassword/')[1];

  //   fetch(`http://localhost:5000/user/resetPassword/${token}`, {
  //     method: 'PATCH',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(password)
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       if (data.status === 'success') {
  //         alert('Password Changed');
  //         window.location.href = 'http://localhost:3000/login';
  //       } else {
  //         alert('Could not change password');
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //       alert('An error occurred while changing password');
  //     });
  // }

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
        <h2>Password Reset</h2>
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
          <NavLink to="/login" className='resettologin'>Go Back</NavLink>
        </form>
      </div>
    </div>

  );
}

export default Forgotpassword