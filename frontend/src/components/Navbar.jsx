import React, { useEffect,useState } from 'react';
import { useUserContext } from "./userContex";
import { NavLink, useNavigate,useLocation } from 'react-router-dom';

const Navbar = () => {
  const Navigate = useNavigate();
  const userContext = useUserContext();
  useEffect(() => {
    fetch('https://budget-buddy-hoki.onrender.com/user/authorized', {
      credentials: 'include',
    }).then((response) => {
      response.json().then(user => {
        userContext.login(user.user_exist);
      })
    })
    // eslint-disable-next-line
  }, []);
  function logout() {
    fetch('https://budget-buddy-hoki.onrender.com/logout', {
      credentials: 'include',
      method: 'GET',
    }).then(() => {
      userContext.logout();
      Navigate('/login');
    })
  }
  const uid = userContext.user;
  if(uid)  console.log(uid);
  const [url, setUrl] = useState(null);
  const location = useLocation();
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  return (
    <div className='navbar_container'>
      <div className='navbar'>
        <NavLink to="/" className="leftnavlink">
          <div className='leftnav'>
            <div className='navlogo'>BUDGET</div><div className='buddy'>BUDDY</div>
          </div>
        </NavLink>
        <ul className="rightnav">
          <li className="rightitem"><NavLink to="/" className={"underline" + (url === "/" ?" activeNavItem" : "")}>Home</NavLink></li>
          {uid && (
            <li className="rightitem"><NavLink to="/search" className={"underline" + (url === "/search" ?" activeNavItem" : "")}>Search</NavLink></li>
          )}
          <li className="rightitem"><NavLink to="/collections" className={"underline" + (url === "/collections" ?" activeNavItem" : "")}>Collections</NavLink></li>
          {uid && (
            <li id='loginbtn' className="rightitem">
              <NavLink onClick={logout}>Logout</NavLink>
            </li>
          )}
          {!uid && (
            <>
              <li className="rightitem"><NavLink to="/signup" className={"underline" + (url === "/signup" ?" activeNavItem" : "")}>Sign Up</NavLink></li>
              <li id='loginbtn' className="rightitem"><NavLink to="/login">Log In</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
export default Navbar