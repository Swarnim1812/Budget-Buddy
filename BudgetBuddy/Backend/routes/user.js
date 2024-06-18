const express = require("express");
var bodyParser = require('body-parser');
const axios = require("axios");

const { defaultPage,checkforemail,resetPassword,forgotPassword,renderResetPassword, addUrlinDatabase,deleteDatabase,add_new_data_in_existing_database,get_products,open_detailed_page,fetchPrice,get_curItem} = require("../controller/user");
const { restrictToSearchRoute, checkAuth, restrictToLoggedinUserOnly} = require("../middlewares/auth");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
// router.get("/", defaultPage);
// router.post("/search", restrictToLoggedinUserOnly,addUrlinDatabase);
router.post("/addUrlinDatabase", restrictToLoggedinUserOnly,addUrlinDatabase);
router.post("/delete", deleteDatabase);
router.post("/add", add_new_data_in_existing_database);
router.post("/details",open_detailed_page);
router.get("/getallproducts",checkAuth,get_products);
router.post("/getcurItem",checkAuth,get_curItem);
router.post("/searchproduct", restrictToLoggedinUserOnly, async(req,res)=> {
    const product = await fetchPrice(req.body.ProductURL);
    return res.json(product);
});

router.get("/search",(req,res)=>{
    return res.render("searchpage");
})

//Authentication Part   
router.get("/signup", (req,res)=>{
    return res.render("signup");
});

//Signout
router.get("/logout",(req,res)=>{
    console.log("logout hu mai")
    res.cookie("uid",'',{maxAge : 1});
    return res.redirect('/');     
});

router.get("/login", (req,res)=>{
    return res.render("login");
});

router.get("/forget-password",(req,res)=>{
   return res.render("forget.ejs");
})

router.get("/mail",(req,res)=>{
    return res.render("verifyemail");
})
router.get("/verify",restrictToLoggedinUserOnly,(req,res)=>{
    console.log("hello i m verify from user");
    return res.json({status:true, message: "authorized"})
    // return res.render("forget.ejs")
})


const { mailT, verify } = require("../controller/trader"); // Import the functions from the trader controller

router.post("/mail2", mailT); // Route to handle mail POST requests
router.post("/verify2", verify); // Route to handle verify POST requests

``
module.exports = router;