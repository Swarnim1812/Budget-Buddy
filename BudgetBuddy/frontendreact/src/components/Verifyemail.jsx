import React from 'react'

const Verifyemail = () => {
  return (
    <div>
      <h1>VERIFY EMAIL TRADER</h1>
      <form action="trader/mail" method="post">
          <label for="email">Email:</label>
          {/* <input type="email" id="email" name="email" required> */}
          <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default Verifyemail