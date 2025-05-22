const express = require("express");
const { handleUserSignup, handleUserLogin, handleUserAuth } = require("../controller/auth");
const { forgotPassword, resetPassword ,renderResetPassword} = require("../controller/user");
const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/authorized", handleUserAuth);
router.post('/forgotPassword',forgotPassword)
router.post('/resetPassword/:token',renderResetPassword)
router.patch('/resetPassword/:token',resetPassword)
module.exports = router;