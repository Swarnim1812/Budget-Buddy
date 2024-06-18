import React from 'react'

const Price = (handleChange) => {
  return (
    <div>
      <h2 className='priceheading'>Price</h2>
      <div className='sidebarprice'>
        <label className='sidebarpricelabel'>
          <input onChange={handleChange} type='radio' value='199' name='test2'/>
          <span className='pricerange'>0-199</span>
        </label>
        <label className='sidebarpricelabel'>
          <input onChange={handleChange}  type='radio' value='299'  name='test2'/>
          <span className='pricerange'>199-299</span>
        </label>
        <label className='sidebarpricelabel'>
          <input  onChange={handleChange}  type='radio' value='399'  name='test2'/>
          <span className='pricerange'>299-399</span>
        </label>
        <label className='sidebarpricelabel'>
          <input onChange={handleChange}  type='radio'  value='499'  name='test2'/>
          <span className='pricerange'>399-499</span>
        </label>
      </div>
    </div>
  )
}

export default Price;