import React from 'react'

const Forget = () => {
  return (
    <>
      <h1>Forget Password</h1>
      <form action="user/forgotPassword" method="post">
        <label>Email</label>
        <input type="text" required name="email" />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Forget