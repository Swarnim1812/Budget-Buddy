const tags = {
    amazon : {
        name : "#productTitle",
        price : ".a-price-whole",
        image : "#landingImage"
    },
    flipkart : {
        name : ".B_NuCI",
        price : "._30jeq3._16Jk6d",     //There are two class named as ._30jeq3 and ._16Jk6d so two check both the classes, this is the way
        image : "._396cs4._2amPTt._3qGmMb"
    },
    indiamart : {
        name : ".bo.center-heading",
        price : ".bo.price-unit",
        image : ".img-drift-demo-trigger"
    }
}
module.exports = tags
