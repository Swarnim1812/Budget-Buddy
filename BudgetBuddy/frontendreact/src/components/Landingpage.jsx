import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useUserContext } from "./userContex";

const Landingpage = () => {
  const userContext = useUserContext();
  useEffect(() => {
    fetch('http://localhost:5000/user/authorized', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        userContext.login(userInfo);
      })
    })
    // eslint-disable-next-line
  }, []);

  const username = userContext.user;
  return (
    <div className='landing'>
      <div className='landingpage'>
        <div className='blur1'></div>
        <h1 className='landingtitle'>Track, compare, save to unlock best deals.</h1>
        <p className='landingdetails'>Stay ahead of the curve with real-time price updates on our comprehensive tracking website.</p>
        <div className='input'>
          {!username && <NavLink to='http://localhost:3000/login'><button className='landingbtn'>Get Started</button></NavLink>}
          {username && <NavLink to='http://localhost:3000/collections'><button className='landingbtn'>Go to Collections</button></NavLink>}
        </div>
      </div>
    </div>
  )
}

export default Landingpage