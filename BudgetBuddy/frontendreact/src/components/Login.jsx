import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from "./userContex";
import { GoArrowRight } from "react-icons/go";
import Swal from 'sweetalert2';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const userContext = useUserContext();

  // ----------------------------------------------------
  const [errors, setErrors] = useState({
    email: '',
  })
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === 'email') {
      value = value.toLowerCase();
      setEmail(value); // Update state with lowercase email
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        setErrors({ ...errors, email: "*Invalid Email Format" })
      }
      else {
        setErrors({ ...errors, email: '' })
      }
    }
  }
  // ----------------------------------------------------
  async function loginuser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/user/login", {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      Swal.fire({
        title: "Login Successful!",
        icon: "success",
        confirmButtonText: "Proceed",
      }).then(() => {
        response.json().then(userInfo => {
          userContext.login(userInfo.user_exist);
          navigate('/');
        })
      });

    }
    else {
      // alert('Please fill the details correctly.');
      Swal.fire({
        title: "Login failed!",
        icon: "error",
        confirmButtonText: "Try Again",
      })
    }
  }
  return (
    <div className='log_in'>
      <div className='loginpage'>
        <div className='loginslide'>
          <div className='logincard'>
            <h2 className='logintitle'>Sign in</h2>
            <form method="post" className='loginform'>
              <div className='form-group'>
                <input
                  className='forminput1'
                  type='text'
                  name='email'
                  id='email'
                  autoComplete='off'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleInputs(e);
                  }}
                  placeholder='Your Email'
                />
                {errors.email && <span className='error'>{errors.email}</span>}
              </div>
              <div className='form-group'>
                <input
                  className='forminput1'
                  type='password'
                  name='password'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete='off'
                  placeholder='Password'
                />
              </div>
              <NavLink to="/forgotpwd" className='alreadyacc'>Forgot your password?</NavLink>
              <div className='form-group form-button'>
                <input
                  type='submit'
                  name='signin'
                  id='signin'
                  className='signinbtn'
                  value='SIGN IN'
                  onClick={loginuser}
                />
              </div>
            </form>
            <br />
          </div>
          <div className='logincard2'>
            <h2 className='logintitle'>Hello, Friend!</h2>
            <p className='loginpara'>Enter your personal details and start journey with us</p>
            <NavLink to="/signup" className='signup_redirect'>SIGN UP<GoArrowRight /></NavLink>
            <br />
          </div>
          <div className='logintosignup'></div>
        </div>
      </div>
    </div>
  )
}

export default Login