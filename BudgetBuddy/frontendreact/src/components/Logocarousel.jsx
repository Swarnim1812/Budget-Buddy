import React from 'react';
import amazon from '../images/amazonlogo.png';
import flipkart from '../images/flipkart.png';
const Logocarousel = () => {
  return (
    <div className='logos'>
      <div className='logos-slide'>
        <img src={amazon} className='amazonlogoimg' alt='amazon'/>
        <img src={flipkart} className='logoimg' alt='amazon'/>
        <img src={amazon} className='amazonlogoimg' alt='amazon'/>
        <img src={flipkart} className='logoimg' alt='amazon'/>
        <img src={amazon} className='amazonlogoimg' alt='amazon'/>
        <img src={flipkart} className='logoimg' alt='amazon'/>
        <img src={amazon} className='amazonlogoimg' alt='amazon'/>
        <img src={flipkart} className='logoimg' alt='amazon'/>
        <img src={amazon} className='amazonlogoimg' alt='amazon'/>
        <img src={flipkart} className='logoimg' alt='amazon'/>
        <img src={amazon} className='amazonlogoimg' alt='amazon'/>
      </div>
      <div className='logos-slide'>
        <img src={flipkart} className='logoimg' alt='amazon'/>
        <img src={amazon} className='amazonlogoimg' alt='amazon'/>
        <img src={flipkart} className='logoimg' alt='amazon'/>
        <img src={amazon} className='amazonlogoimg' alt='amazon'/>
        <img src={flipkart} className='logoimg' alt='amazon'/>
        <img src={amazon} className='amazonlogoimg' alt='amazon'/>
        <img src={flipkart} className='logoimg' alt='amazon'/>
        <img src={amazon} className='amazonlogoimg' alt='amazon'/>
        <img src={flipkart} className='logoimg' alt='amazon'/>
        <img src={amazon} className='amazonlogoimg' alt='amazon'/>
        <img src={flipkart} className='logoimg' alt='amazon'/>
      </div>
    </div>
  )
}

export default Logocarousel;