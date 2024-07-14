import React from 'react';
import Graph from './Graph';
import { useLocation, Link } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import { BsGraphUpArrow } from "react-icons/bs";
const Display = () => {
  const location = useLocation();
  const productdata = location.state;
  const { img, title, expectedPrice, newPrice, productURL } = productdata;
  return (
    <div className='display'>
      <div className='itemsearch'>
        <div className='displaycontainer'>
          <div className='cardbox'>
            <img src={img} alt='Wristwatch by Ted Baker London' className='productimg' />
            <h2 className='ptitle'>{title}</h2>
            <h3 className='pprice'> CURRENT PRICE IS ₹ {newPrice}</h3>
          </div>
        </div>
        <div className='graphcontainer'>
          <p className='graphtitle'>Price History {<BsGraphUpArrow />}</p>
          <Graph productURL={productURL} className='graph' />
          <p className='linkguide'>You can visit product in its official website at</p>
          <Link to={productURL} target='_blank'><h4 className='producturl'>{productURL}</h4></Link>
        </div>
      </div>
      <Link to='/collections' className='gobacklink'><button className='gobackbtn'><GoArrowLeft className='gobackarrow' /></button></Link>

    </div>
  )
}

export default Display