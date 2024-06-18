const {fetchPrice} =require('../controller/user')
const cron = require('node-cron');
const User = require('../models/user');
const sendEmail = require('./email');

async function trackPrice(){
    console.log('scheduled task has begun ');
    const user = await User.find({});
    //For all user
    user.forEach(element => {
        const items = element.itemsAdded
        //For all proucts
        items.forEach(async (product) => {
            try{
                //fetchPrice
            const price = await fetchPrice(product.productURL)
            if(price < product.expectedPrice){ 
                console.log('sending mail now')
                const message = `The price for ${product.productURL} has dropped and is now priced at : ${price}`
                const mail = {
                    type : 'Price Drop Alert',
                    body :{
                        from : 'zen.jaiswal34@gmail.com',
                        to : element.email,
                        subject : 'Password Reset ',
                        text : message
                    }
                }
                sendEmail(mail)
            }
            }catch (error){
                console.log(error.message)
                console.log(`Could not fetch price for ${element.email} `);
            }
        });
    });
}   
//Schedule the price track at 5 :00 Am everyday 
const scheduled = cron.schedule(' 0 5 * * *',trackPrice);
module.exports = scheduled 
