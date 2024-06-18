import React from 'react'

const Category = (handleChange) => {
  return (
    <div>
      <h2 className='sidebar_title'>Category</h2>
      <div className='categories'>
        <label className='sidebar_label_container'>
          <input onChange={handleChange} type='radio' value='All' name='test'/>
          <span className='checkmark'>All</span>
        </label>
        <label className='sidebar_label_container'>
          <input onChange={handleChange} type='radio' value='Sneakers' name='test'/>
          <span className='checkmark'>Sneakers</span>
        </label>
        <label className='sidebar_label_container'>
          <input onChange={handleChange} type='radio' value='Flats' name='test'/>
          <span className='checkmark'>Flats</span>
        </label>
        <label className='sidebar_label_container'>
          <input onChange={handleChange} type='radio' value='Sandals' name='test'/>
          <span className='checkmark'>Sandals</span>
        </label>
        <label className='sidebar_label_container'>
          <input onChange={handleChange} type='radio' value='Heels' name='test'/>
          <span className='checkmark'>Heels</span>
        </label>
      </div>
    </div>
  )
}

export default Category;





// function Input({handleChange,value,title, name}){
//   return(
//     <label className='sidebar_label_container'>
//       <input onChange={handleChange} type='radio' value={value} name={name}/>
//       <span className='checkmark'></span>
//       {title}
//     </label>
//   )
// }