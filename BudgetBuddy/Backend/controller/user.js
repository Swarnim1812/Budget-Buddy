const { response } = require('express');
const axios = require("axios").default;
// Important: If axios is used with multiple domains, the information will be sent to all of them.
const cheerio = require("cheerio");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const Product = require('../models/product')
const sendEmail = require('../utils/email')
const crypto = require('crypto');
const ProductFactory = require('../service/productFactory');
var newPrice;
async function defaultPage(req, res) {
  try {
    if (!req.user) return res.render("homepage");
    const xyz = req.user.email;
    return res.render("homepage", {
      user: xyz,
    });
  } catch (error) {
    console.log(error);
  }
}
//Detailed Page
async function open_detailed_page(req, res) {
  const detail1 = req.body.DetailList;
  try {
    const CurrentProduct = await User.findOne({ 'itemsAdded.productURL': detail1 }, { 'itemsAdded.$': 1 });
    const checkDetails = await Product.findOne({ url: detail1 });
    res.render("details", {
      ProductURL: detail1,
      currentPrice: checkDetails.price,
      imageUrl: checkDetails.imageUrl
    })
  }
  catch (err) {
    console.log(err);
  }
}
//Delete database
async function deleteDatabase(req, res) {
  const URLToDelete = req.body.deleteItemId;
  const xyz = req.user.email;
  var checker = false;
  const resulttttttt = await User.findOne({ email: req.user.email })
  if (resulttttttt.userType == 'user') {
    await User.updateMany({ "itemsAdded.productURL": URLToDelete }, { $pull: { itemsAdded: { productURL: URLToDelete } } });
  }
  if (resulttttttt.userType == 'trader') {
    for (const index in resulttttttt.itemsAdded) {
      if (URLToDelete == resulttttttt.itemsAdded[index].productURL) {
        checker = true;
      }
    }
    if (checker == true) {
      await User.updateMany({ "itemsAdded.productURL": URLToDelete }, { $pull: { itemsAdded: { productURL: URLToDelete } } });
    }
    else {
      console.log("Not Your Product");
    }
  }

  const result = await User.findOne({ email: req.user.email })

  let listYourProduct = [];
  let listAllProduct = [];
  let flag = false;
  try {
    if (result.userType == 'user') {
      listYourProduct = await yourproductlisting(result.itemsAdded);
    }
    if (result.userType == 'trader') {
      listYourProduct = await yourproductlisting(result.itemsAdded);
      flag = true;
      listAllProduct = await allproductlisiting();
    }
    let products = {
      listTitle: xyz,
      listItems: listYourProduct,
      listAllItems: listAllProduct,
      checkUser: flag
    }
    res.render("searchpage", products)

  } catch (err) {
    console.log(err);
  }
}
//Add product urls in database
async function addUrlinDatabase(req, res) {
  console.log("in searching")
  console.log(req.body);
  const data = { productURL: req.body.ProductURL, expectedPrice: req.body.expectedPrice }
  await fetchPrice(data.productURL, data.expectedPrice);
  await User.updateOne({ email: req.user.email, 'itemsAdded.productURL': { $ne: data.productURL } }, { $push: { itemsAdded: data } })  //Uniquely adds url in database
  let user = await User.findOne({ email: req.user.email })
  let listYourProduct = [];
  let listAllProduct = [];
  let flag = false;

  if (user.userType == 'user') {
    listYourProduct = await yourproductlisting(user.itemsAdded)
  }

  if (user.userType == 'trader') {
    listYourProduct = await yourproductlisting(user.itemsAdded)
    flag = true;
    listAllProduct = await allproductlisiting();
  }

  let products = {
    listTitle: user.email,
    listItems: listYourProduct,
    listAllItems: listAllProduct,
    checkUser: flag
  }
  res.render("searchpage", products)
}
//ListYourProduct
async function yourproductlisting(database) {
  let listYourProduct = [];
  for (var index in database) {
    console.log("umaaaaa");
    const x = database[index].productURL;
    console.log(x);

    const y = await Product.findOne({ url: x });
    let product = JSON.parse(JSON.stringify(database[index]));
    console.log("oaaaaaaaaa");
    console.log(y);
    product.name = y.name;
    product.price = y.price;
    product.imageUrl = y.imageUrl;
    product.expectedPrice = database[index].expectedPrice;
    listYourProduct[index] = product;
  }
  return listYourProduct;
}
//AllYourProduct
async function allproductlisiting() {
  let listAllProduct = [];
  for (const index in await Product.find({}, { _id: 1 })) {
    const y = await Product.find({});
    let product = [];
    product.url = y[index].url;
    product.name = y[index].name;
    product.price = y[index].price;
    product.imageUrl = y[index].imageUrl;
    listAllProduct[index] = product;
  }
  return listAllProduct;
}
//Add new producturls and expectedprice in existing database using plus button
async function add_new_data_in_existing_database(req, res) {
  console.log("hello add function")
  const xyz = req.user.email;
  let listYourProduct = [];
  let listAllProduct = [];
  let flag = false;
  try {
    const data = { productURL: req.body.newProductURL, expectedPrice: req.body.newexpectedPrice }
    await fetchPrice(data.productURL, data.expectedPrice);
    // CurrentUser.itemsAdded.push({productURL:item1,expectedPrice:item2});
    // await CurrentUser.save();
    await User.updateOne({ email: req.user.email, 'itemsAdded.productURL': { $ne: data.productURL } }, { $push: { itemsAdded: data } })

    const result = await User.findOne({ email: req.user.email })
    if (result.userType == 'user') {
      listYourProduct = await yourproductlisting(result.itemsAdded)
    }

    if (result.userType == 'trader') {
      listYourProduct = await yourproductlisting(result.itemsAdded)
      flag = true;
      listAllProduct = await allproductlisiting();
    }

    let products = {
      listTitle: result.email,
      listItems: listYourProduct,
      listAllItems: listAllProduct,
      checkUser: flag
    }
    res.render("searchpage", products)
  } catch (err) {
    console.log("helo error");
    console.log(err);
  }

}
//get all products
async function get_products(req, res) {
  console.log("inside get products11111111111111111111");
  try {
    // console.log(req.user);
    const result = await User.findOne({ email: req.user.email })
    let listAllProduct = [];
    let flag = false;
    if (result.userType == 'user') {
      listYourProduct = await yourproductlisting(result.itemsAdded)
    }
    if (result.userType == 'trader') {
      listYourProduct = await yourproductlisting(result.itemsAdded)
      flag = true;
      listAllProduct = await allproductlisiting();
    }
    let products = {
      listTitle: result.email,
      listItems: listYourProduct,
      listAllItems: listAllProduct,
      checkUser: flag
    }
    console.log(products);
    console.log("yoyoyyoyo")
    return res.status(200).json(products);
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({ message: "errrrrrrrrrroooooor" });

  }
}
async function get_curItem(req, res) {
  console.log("inside get CUR ITEM");
  try {
    const x = req.body.ProductURL;
    console.log(x)
    const y = await Product.findOne({ url: x });
    console.log(y.priceHistory)
    console.log("sab sahi chal raha")
    return res.status(200).json(y);
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({ message: "error occurred. Try again." });
  }
}
//Forget password email
async function checkforemail(req, res) {
  try {
    const abc = req.body.emailforget;
    // console.log(abc);
    return res.redirect('/forgotPassword')
  }
  catch (error) {
    console.log(error);
  }
}


async function fetchPrice(url) {
  const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0";

  //console.log(`I have reached here ${url}`);

  console.log(url);
  const response = await axios.get(url, {
    headers: {
      "User-Agent": userAgent,
      "Sec-Ch-Ua-Full-Version-List": "\"Not_A Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"120.0.6099.71\", \"Microsoft Edge\";v=\"120.0.2210.61\"",
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Model": '""',
      "Sec-Ch-Ua-Platform": '"Linux"',
      "Sec-Ch-Ua-Platform-Version": '"6.5.0"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1"
    }
  });
  const html = response.data;

  const parsedhtml = cheerio.load(html); //html parsing through cheerio
  let product = ProductFactory.getProduct(url, parsedhtml) //Factory for getting product items
  product.url = url;//adding url to product object 
  const date = new Date()
  //Adding the product to product collection
  const doc = await Product.findOne({ url })
  if (!doc) {
    product.priceHistory = []
    product.priceHistory.push({
      price: product.price,
      date: date
    })
    Product.create(product)
  }
  else {
    doc.priceHistory.push({
      price: product.price,
      date: date
    })
    doc.price = product.price
    doc.save();
  }
  // return product.price;
  return product;
}

async function sendmail() {
  const nodemailer = require("nodemailer");
  const user = "zen.jaiswal34@gmail.com";
  const pass = "ejbtxdljmgevlkmw"

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user,
      pass
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Lavkesh" <${user}>`, // sender address
      to: "lavkesh.jaiswal34@gmail.com, btech10237.22@bitmesra.ac.in", // list of receivers
      subject: "Price fell down ✔", // Subject line
      text: `The price of ${url} fell down, check it out!!!`, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  main().catch(console.error);

}

/*
Method to render the reset password webpage when a user clicks 
on the link on the email
*/
let renderResetPassword = (req, res) => {

  // res.render('resetPassword', {
  //   token: req.params.token
  // })
}

/*
reset Password method to fire when the user submits a new password using 
link sent to email , this method stores the new password along with deletion 
of the resetToken 
*/
let resetPassword = async (req, res) => {
  try {
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpires: { $gt: Date.now() } })
    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or expired' })
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined
    user.save()
    return res.status(200).json('password changed')
  } catch (err) {
    console.log(err.message + "and stack is /n" + err.stack)
  }
}

/*
  Method to fire when user request for a forgot password 
  This function creates a reset token to be stored in db 
  create a reset password url 
  send that url to user using nodemailer 
*/
async function forgotPassword(req, res) {
  const user = await User.findOne({ email: req.body.email })
  //console.log(req.body.email);
  if (!user) {
    return res.status(400).json({ message: "Cannot find user with that email" });
  }
  const resetToken = user.createToken();
  await user.save();
  // const resetUrl = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`
  const resetUrl = `${req.protocol}://localhost:3000/user/resetPassword/${resetToken}`
  const message = `We have received a password reset request. Please use the below link to reset your password\n\n${resetUrl}`;
  let mail = {
    type: 'Password Reset Email',
    body: {
      from: 'zen.jaiswal34@gmail.com',
      to: user.email,
      subject: 'Password Reset ',
      text: message
    }
  }
  try {
    sendEmail(mail);
    res.status(200).json({
      status: 'success',
      message: 'password reset link sent to email'
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined
    user.save()
    console.log(err.message)
    res.status(400)
    res.json({
      status: 'error',
      message: 'Could not send email'
    })
  }
}

module.exports = {
  defaultPage, checkforemail, fetchPrice, renderResetPassword, resetPassword, forgotPassword, addUrlinDatabase, deleteDatabase, add_new_data_in_existing_database, get_products, open_detailed_page, fetchPrice, get_curItem
};
