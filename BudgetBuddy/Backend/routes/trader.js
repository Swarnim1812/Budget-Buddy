const express = require("express");
const router = express.Router();
const { mailT, verify } = require("../controller/trader"); // Import the functions from the trader controller

router.post("/mail", mailT); // Route to handle mail POST requests
router.post("/verify", verify); // Route to handle verify POST requests

// Route to render the verifyemail view
router.get("/mail", (req, res) => {
    return res.render("verifyemail");
});

// Route to render the verify view

module.exports = router;