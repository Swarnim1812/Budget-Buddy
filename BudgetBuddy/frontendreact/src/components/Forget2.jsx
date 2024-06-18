import React from 'react'

const Forget2 = () => {
  return (
    <div>
      <h1>Verify OTP</h1>
   
      <form action="/trader/verify" method="POST">
          {/* <label htmlFor="otp">Enter OTP:</label>
          <input type="text" id="otp" name="otp">
          <input type="hidden" name="email" value="a">
          <button type="submit">Verify</button> */}
      </form>
    </div>
  )
}

export default Forget2