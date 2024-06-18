import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';  

const Logout = () => {

  // useEffect(() => {
  //   LogoutUser();
  // }, [LogoutUser])

  return <useNavigate to="/login"/>
}

export default Logout