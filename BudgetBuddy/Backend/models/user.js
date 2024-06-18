const mongoose = require("mongoose");
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
        type: String,
      },
    phone_number: {
        type: String,
        required: true,
        unique: true,
        
    },
    email: {
      type: String,
      required: true,
      unique: true,
      
    },
    password: {
      type: String,
      required: true,
    },
    userType: { // Add userType field to the schema
      type: String,
      required: true,
       // Specify the allowed values
    },
    itemsAdded:[
      {
      productURL: {
        //type: mongoose.Schema.Types.ObjectId,
        type:String,
        //unique: true,
      },
      expectedPrice: {
        type:Number,
      },
    }
    ],
  visitHistory: [{ type: Number }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  passwordResetToken : {
    type : String,
},
passwordResetTokenExpires : {
    type : Date
}
},
{ timestamps: true }
);

userSchema.methods.createToken = function(){ 
  const resetToken = crypto.randomBytes(32).toString('hex'); 
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetTokenExpires = Date.now()+ 10*60*1000;
  console.log(resetToken,this.passwordResetToken);
  return resetToken;
}
const User = mongoose.model("BudgetBuddy-users", userSchema);

module.exports = User;