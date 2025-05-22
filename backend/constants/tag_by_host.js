const tags = {
    amazon : {
        name : "#productTitle",
        price : ".a-price-whole",
        image : "#landingImage"
    },
    flipkart : {
        name : ".VU-ZEz",
        price : ".Nx9bqj.CxhGGd",//There are two class named as ._30jeq3 and ._16Jk6d so two check both the classes, this is the way
        image : ".DByuf4.IZexXJ.jLEJ7H"
    },
    indiamart : {
        name : ".bo.center-heading",
        price : ".bo.price-unit",
        image : ".img-drift-demo-trigger"
    }
}
module.exports = tags
