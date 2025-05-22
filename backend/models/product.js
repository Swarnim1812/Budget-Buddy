const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name  :{
        type : String,
    },
    url: {
        type: String,
        unique: true
    },
    imageUrl:{
        type: String,
    },
    price :{
        type : Number
    },
    priceHistory : [{
        price:{
            type : Number
        },
        date : {
            type : Date
        }
    }]
});
const Products = mongoose.model('Products',productSchema)
module.exports = Products;