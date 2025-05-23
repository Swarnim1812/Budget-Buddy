import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "./Nav.css";
import { LuSun } from "react-icons/lu";
// import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
const Nav = () => {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ ProductURL: '', expectedPrice: undefined });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const Itemdata = async (e) => {
    setOpen(true);
    e.preventDefault();
    const { ProductURL, expectedPrice } = user;
    console.log("hello item data bhej rha hu");
    const res = await fetch('https://budget-buddy-hoki.onrender.com/searchproduct/', {
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
      setOpen(false);
      Swal.fire({
        title: "Item found!",
        text: "Click OK to proceed",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        Navigate(`/searchitempage/${expectedPrice}`, { state: data });
      });
    }
    else if (res.status === 400) {
      const data = await res.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.error.message,
        confirmButtonText: "Try Again",
      }).then(() => {
        Navigate('/collections');
      });
    }
  };
  const [email, setEmail] = useState('');
  useEffect(() => {
    const fetchdata = async () => {
      let temp;
      const data = await fetch("https://budget-buddy-hoki.onrender.com/getallproducts", {
        credentials: 'include',
      });
      temp = await data.json();
      setEmail(temp.listTitle);
    };
    fetchdata();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <nav>
        <h2 className="navtitle1">Welcome <div className='email_section'>{email}</div><LuSun className="hello" /></h2>
        <div className='formcontainer'>
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
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <button type="search" className='searchbtn' onClick={Itemdata}>FIND</button>

          </form>
        </div>
      </nav>
      {/* } */}
    </>
  );
};
export default Nav;