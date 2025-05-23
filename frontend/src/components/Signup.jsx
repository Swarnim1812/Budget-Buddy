import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Signup = () => {
  const [open, setOpen] = useState(false);

  const history = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastname: '',
    phone_number: '',
    email: '',
    password: '',
    userType: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastname: '',
    phone_number: '',
    email: '',
    password: '',
  })
  let name, value;
  const handleInputs = (e) => {
    //It is taking input as key value pair
    //here key is name like firstname,lastname,email
    //here value is it's value
    name = e.target.name;
    value = e.target.value;

    if (name === 'firstName' || name === 'lastname') {
      const regex = /^[a-zA-Z]*$/;
      if (!regex.test(value)) {
        setErrors({ ...errors, [name]: "*Only Alphabetical letters are allowed." })
      }
      else {
        setErrors({ ...errors, [name]: '' })
      }
    }
    else if (name === 'phone_number') {
      const regex = /^[0-9]*$/;
      if (!regex.test(value)) {
        setErrors({ ...errors, phone_number: "*Only Numberic digits are allowed." })
      }
      if (value.length !== 10) {
        setErrors({ ...errors, phone_number: "*The length of Phone number should only be 10" })
      }
      else {
        setErrors({ ...errors, phone_number: '' });
      }
    }
    else if (name === 'email') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        setErrors({ ...errors, email: "*Invalid Email Format" })
      }
      else {
        setErrors({ ...errors, email: '' })
      }
    }
    else if (name === 'password') {
      if (value.length < 8) {
        setErrors({ ...errors, password: "*Too Weak Level Password" })
      }
      else if (value.length >= 8 && value.length < 13) {
        setErrors({ ...errors, password: "*Medium Level Password" })
      }
      else {
        setErrors({ ...errors, password: '' });
      }
    }
    else if (name === 'userType') {
      if (value === '') {
        setErrors({ ...errors, userType: "*Please select a user type." });
      } else {
        setErrors({ ...errors, userType: '' });
      }
    }
    setUser({ ...user, [name]: value });
  };

  const redirectToOtpPage = async (e) => {
    setOpen(true);
    const { userType, email } = user;
    if (userType === 'trader') {
      // ---------------------------------------------------------------
      e.preventDefault();
      const response = await fetch("https://budget-buddy-hoki.onrender.com/trader/mail", {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        setOpen(false);
        window.alert("OTP Sent to Your Email for two step verification");
        history('/otpVerify', { state: user });
      }
      else {
        alert('Please fill the details correctly.');
      }
      // ---------------------------------------------------------------
    }
    else {
      e.preventDefault();
      const { firstName, lastname, phone_number, email, password, userType } = user;
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
  };

  // Check if there are any errors
  const isDisabled = Object.values(errors).some(error => error !== '') || Object.values(user).some(value => value === '');

  // Enable button only if there are no errors and userType is selected
  const buttonDisabled = isDisabled || user.userType === '';

  return (
    <div className='signup'>
      <div className='signuppage'>
        <div className='signpuslide'>
          <div className='signupform2'>
            <h1 className='logintitle'>Welcome Back!</h1>
            <p className='signintext'>To keep connected with us please login with your personal info</p>
            <NavLink to='/login' className='signin_redirect'><GoArrowLeft />SIGN IN</NavLink>
          </div>
          <form className='signupform' id='register-form'>
            <h1 className='logintitle'>Sign Up</h1>
            <div className='form-group'>
              <input
                className='forminput2'
                type='text'
                name='firstName'
                id='firstName'
                autoComplete='off'
                value={user.firstName}
                onChange={handleInputs}
                placeholder='First Name'
              />
              {errors.firstName && <span className='error'>{errors.firstName}</span>}
            </div>
            <div className='form-group'>
              <input
                className='forminput2'
                type='text'
                name='lastname'
                id='lastname'
                autoComplete='off'
                value={user.lastname}
                onChange={handleInputs}
                placeholder='Last Name'
              />
              {errors.lastname && <span className='error'>{errors.lastname}</span>}
            </div>

            <div className='form-group'>
              <input
                className='forminput2'
                type='number'
                name='phone_number'
                id='phone_number'
                autoComplete='off'
                value={user.phone_number}
                onChange={handleInputs}
                placeholder='Phone'
              />
              {errors.phone_number && <span className='error'>{errors.phone_number}</span>}
            </div>

            <div className='form-group'>
              <input
                className='forminput2'
                type='email'
                name='email'
                id='email'
                autoComplete='off'
                value={user.email}
                onChange={handleInputs}
                placeholder='Email'
              />
              {errors.email && <span className='error'>{errors.email}</span>}
            </div>

            <div className='form-group'>
              <input
                className='forminput2'
                type='password'
                name='password'
                id='password'
                autoComplete='off'
                value={user.password}
                onChange={handleInputs}
                placeholder='Password'
              />
              {errors.password && <span className='error'>{errors.password}</span>}
            </div>

            <div className='form-group'>
              <input
                className='forminput2'
                type='text'
                name='userType'
                id='userType'
                autoComplete='off'
                value={user.userType}
                onChange={handleInputs}
                placeholder='user / trader'
              />
              {errors.userType && <span className='error'>{errors.userType}</span>}
            </div>

            <div className='form-group form-button'>
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                <CircularProgress color="inherit" />
              </Backdrop>
              <input
                type='submit'
                name='signup'
                id='signup'
                className='signinbtn'
                value='REGISTER'
                onClick={redirectToOtpPage}
                disabled={buttonDisabled}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;
