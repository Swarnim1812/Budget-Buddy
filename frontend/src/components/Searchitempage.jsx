import React, { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";
const Searchitempage = () => {
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();
  const params = useParams();
  const expectedPrice = params.expectedPrice;
  console.log(expectedPrice);
  // -----------------------------------------------------------------------
  const location = useLocation();
  const productdata = location.state;
  console.log(productdata);

  // -----------------------------------------------------------------------
  const AddFunction = async (e) => {
    setOpen(true);
    console.log("hehhehe");
    e.preventDefault();
    const { url } = productdata;
    const ProductURL = url;
    console.log(ProductURL);
    console.log(expectedPrice)
    const res = await fetch('https://budget-buddy-hoki.onrender.com/addUrlinDatabase', {
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
    console.log("ho gya add");
    if (res.ok) {
      setOpen(false);
      // window.alert('Item Added');
      // swal("Item Added!","click OK to continue", "success");
      Swal.fire({
        title: "Item Added!",
        text: "Click OK to proceed",
        icon: "success",
        confirmButtonText: "OK",
      })
      console.log('Item Added');
    }
    else if (res.status === 400) {
      const data = await res.json();
      console.log(data);
      window.alert(data.error.message);
    }
  };
  // -----------------------------------------------------------------------
  const [user, setUser] = useState({
    P_URL: '',
    ePrice: null
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const Itemdata = async (e) => {
    setOpen(true);
    e.preventDefault();
    const { P_URL, ePrice } = user;
    const ProductURL = P_URL;
    const expectedPrice = ePrice;
    console.log("hello Im sending product details");
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
      // window.alert('sent successfully');
      // swal("Item found!","click OK to continue", "success");
      Swal.fire({
        title: "Item found!",
        text: "Click OK to proceed",
        icon: "success",
        confirmButtonText: "OK",
      })
      console.log('data sent');
      Navigate(`/searchitempage/${expectedPrice}`, { state: data });
    }
    else if (res.status === 400) {
      const data = await res.json();
      console.log(data);
      window.alert(data.error.message);
    }
  };
  // -----------------------------------------------------------------------
  return (
    <div className='search'>
      <div className='searchpage'>
        <div className='searchanother'>
          <input
            className='searchanotherinput'
            type='text'
            name='P_URL'
            id='P_URL'
            autoComplete='off'
            value={user.P_URL}
            onChange={handleInputs}
            placeholder='Paste Product Link'
          />
          <input
            className='searchanotherinput'
            type='text'
            name='ePrice'
            id='ePrice'
            autoComplete='off'
            value={user.ePrice}
            onChange={handleInputs}
            placeholder='Enter Expected Price'
          />
          <button type="search" className='searchanotherbtn' onClick={Itemdata}>Search</button>
        </div>
        <div className='searchitempage'>
          <div className='imagesection'>
            <div className='imgcontainer'>
              <img src={productdata.imageUrl} alt={productdata.name} className="searchimg" />
            </div>
            <button type="search" className='addtotrack' onClick={AddFunction}>ADD TO TRACK</button>
          </div>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className='searchdetails'>
            <h1 className='searchtitle'>{productdata.name}</h1>
            <h1 className='currentpricetag'>Current Price</h1>
            <h1 className='currentprice'>₹ {productdata.price}</h1>
            <h1 className='expectedpricetag'>Expected Price</h1>
            <h1 className='expectedprice'>₹ {expectedPrice}</h1>
          </div>
        </div>
        <Link to='/collections' className='gobackbtn2'>Go To Collections <GoArrowRight /></Link>        
      </div>
    </div>
  )
}

export default Searchitempage