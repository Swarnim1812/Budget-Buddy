import React from 'react'
import Category from './Category';
import Price from './Price';

const Sidebar = (handleChange) => {

  return (
    <section className='Sidebar'>
      <div className='logo_container'>
        <h1>🛒</h1>
      </div>
      <Category handleChange={handleChange}/>
      <Price handleChange={handleChange}/>
    </section>
  )
}

export default Sidebar;