const tags = require('../constants/tag_by_host')

function scrapeProduct(tags,html) {
    let productName = html(tags.name).text().trim();
      let priceElementText= html(tags.price).text();
      let imageUrl = html(tags.image).attr().src;
      priceElementText=priceElementText.split('.');
      newPrice= priceElementText[0];
      newPrice = parseFloat(newPrice.replace(/\D/g,""));
      return {
        name : productName,
        imageUrl :  imageUrl,
        price :  newPrice
      }
}
function ajio(response){
    let obj = JSON.parse(response('script').get()[5].children[0].data)
      return {
        name : obj["name"],
        imageUrl :  obj["image"],
        price :  obj["offers"]["price"]
      }
}
class ProductFactory{
    static getProduct(address,html){
        let url = new URL(address)
        let hostname = url.toString().split('.')[1];
        if(hostname =="ajio")
         return ajio(html)
        else
        return scrapeProduct(tags[hostname],html)
    }
}

module.exports = ProductFactory