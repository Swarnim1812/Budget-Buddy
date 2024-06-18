import React, { useEffect } from 'react';
import { useUserContext } from "./userContex";
import { NavLink, useNavigate } from 'react-router-dom';

// import {useAuth} from '../context/AuthContext';

const Navbar = () => {
  const Navigate = useNavigate();
  const userContext = useUserContext();
  useEffect(() => {
    fetch('http://localhost:5000/user/authorized', {
      credentials: 'include',
    }).then((response) => {
      response.json().then(user => {
        userContext.login(user);
      })
    })
    // eslint-disable-next-line
  }, []);
  console.log(userContext.user);
  function logout() {
    fetch('http://localhost:5000/logout', {
      credentials: 'include',
      method: 'GET',
    }).then(() => {
      userContext.logout();
      Navigate('/login');
    })
  }
  const uid = userContext.user;

  console.log(uid);

  return (
    <div className='navbar_container'>
      <div className='navbar'>
        <NavLink to="/">
          <div className='leftnav'>
            <div className='navlogo'>BUDGET</div><div className='buddy'>BUDDY</div>
          </div>
        </NavLink>
        <ul className="rightnav">
          <li className="rightitem"><NavLink to="/">Home</NavLink></li>
          <li className="rightitem"><NavLink to="/collections">Collections</NavLink></li>
          {uid && (
            <li id='loginbtn' className="rightitem">
              <NavLink onClick={logout}>Logout</NavLink>
            </li>
          )}
          {!uid && (
            <>
              <li className="rightitem"><NavLink to="/signup">Sign Up</NavLink></li>
              <li id='loginbtn' className="rightitem"><NavLink to="/login">Log In</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar