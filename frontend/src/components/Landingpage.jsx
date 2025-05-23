import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useUserContext } from "./userContex";
import { GrLogin } from "react-icons/gr";

const Landingpage = () => {
  const userContext = useUserContext();
  useEffect(() => {
    fetch('https://budget-buddy-hoki.onrender.com/user/authorized', {
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
        <div className='blur2'></div>
        <div className='blur3'></div>
        <div className='landingcard'>
          <h1 className='landingtitle'>Track, compare, save to unlock best deals.</h1>
          <p className='landingdetails'>Stay ahead of the curve with real-time price updates on our comprehensive tracking website.</p>
          <div className='input'>
            {!username && <NavLink to='/login'><button className='landingbtn'>Get Started<GrLogin className='goarrowright'/></button></NavLink>}
            {username && <NavLink to='/collections'><button className='landingbtn'>Go to Collections<GrLogin className='goarrowright'/></button></NavLink>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landingpage