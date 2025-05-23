import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
const Otpverify = () => {
  const location = useLocation();
  const signupdata = location.state;
  console.log(signupdata.email);
  const { email } = signupdata;
  const [otp, setOtp] = useState('');
  const history = useNavigate();
  // -----------------------------------------------------
  async function otpdata(e) {
    e.preventDefault();
    const response = await fetch("https://budget-buddy-hoki.onrender.com/trader/verify", {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      window.alert("Otp Matched Successful");
      e.preventDefault();
      const { firstName, lastname, phone_number, email, password, userType } = signupdata;
      console.log("hello from postdata");
      const res = await fetch('https://budget-buddy-hoki.onrender.com/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName: lastname,
          phone_number,
          email,
          password,
          userType
        })
      });
      if (res.ok) {
        window.alert('Registration Successful');
        console.log('Registration Successful');
        history('/login');
      }
      else if (res.status === 400) {
        const data = await res.json();
        console.log(data);
        window.alert(data.error.message);
      }
    }
    else {
      alert('Otp Not Matched');
    }
  }
  // -----------------------------------------------------
  return (
    <div className='otpverifypage'>
      <div className='otpcard'>
        <h1 className='otptitle'>Two Step Verification</h1>
        <p className='otpdesc'>Enter the verification code sent to</p>
        <p className='otpemail'>{email}</p>
        <p className='otpdesc2'>Type your 6 digit security code</p>
        <div className='otpinput'>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <button className='otpbtn' onClick={otpdata}>Submit</button>
      </div>
    </div>
  )
}

export default Otpverify