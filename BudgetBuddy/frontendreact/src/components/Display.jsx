import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import Graph from './Graph';
import { useLocation,Link } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";

const Display = (props) => {
  const location = useLocation();
  const productdata = location.state;
  const {img,title,newPrice,expectedPrice,productURL}=productdata;
  return (
    <div className='display'>
      <div className='itemsearch'>
        <div className='cardbox'>
          <div className='magnifier'>
            <ReactImageMagnify {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: `${img}`,
              },
              largeImage: {
                src:`${img}`,
                width: 1100,
                height: 750
              },
              shouldUsePositiveSpaceLens: true,
              isHintEnabled: true,
            }} />
          </div>
          <div className='graphcontainer'>
            <Graph productURL={productURL}/>
          </div>
        </div>
      </div>
      <Link to='/collections'><button className='gobackbtn'>Go Back</button></Link>
    </div>
  )
}

export default Display