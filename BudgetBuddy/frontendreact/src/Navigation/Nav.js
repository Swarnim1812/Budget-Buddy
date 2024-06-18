import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Nav.css";
const Nav = (props) => {
  const Navigate = useNavigate();
  const [user, setUser] = useState({ProductURL: '',expectedPrice: null});
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const Itemdata = async (e) => {
    e.preventDefault();
    const { ProductURL, expectedPrice } = user;
    console.log("hello item data bhej rha hu");
    const res = await fetch('http://localhost:5000/searchproduct/', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ProductURL,
        expectedPrice
      })
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      window.alert('sent successfully');
      console.log('data sent');
      Navigate(`/searchitempage/${expectedPrice}`, { state: data });
    }
    else if (res.status === 400) {
      const data = await res.json();
      console.log(data);
      window.alert(data.error.message);
    }
  };
  return (
    <nav>
      {props.email && (
        <h2 className="navtitle">Welcome, {props.email}</h2>
      )}
      <h2 className="navtitle">SEARCH NEW PRODUCT</h2>
      <form className='home_form'>
        <input
          className='navforminput'
          type='text'
          name='ProductURL'
          id='ProductURL'
          autoComplete='off'
          value={user.ProductURL}
          onChange={handleInputs}
          placeholder='Paste Product Link'
        />
        <input
          className='navforminput'
          type='text'
          name='expectedPrice'
          id='expectedPrice'
          autoComplete='off'
          value={user.expectedPrice}
          onChange={handleInputs}
          placeholder='Enter Expected Price'
        />
        <button type="search" className='searchbtn' onClick={Itemdata}>Search</button>
      </form>
    </nav>
  );
};
export default Nav;