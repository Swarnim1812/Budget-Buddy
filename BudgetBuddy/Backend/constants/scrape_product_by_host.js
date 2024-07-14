const { flipkart, indiamart, amazon } = require("./tag_by_host")

scrape_host = {
  ajio: (response) => {
    let obj = JSON.parse(response('script').get()[5].children[0].data);
    return {
      name: obj["name"],
      imageUrl: obj["image"],
      price: obj["offers"]["price"]
    }
  },
  flipkart: (tags, html) => {
    let productName = html(tags.name).text().trim();
    let priceElementText = html(tags.price).text();
    let imageUrl = html(tags.image).attr().src;
    priceElementText = priceElementText.split('.');
    newPrice = priceElementText[0];
    newPrice = parseFloat(newPrice.replace(/\D/g, ""));
    return {
      name: productName,
      imageUrl: imageUrl,
      price: newPrice
    }
  },
  indiamart: (tags, html) => {
    let productName = html(tags.name).text().trim();
    let priceElementText = html(tags.price).text();
    let imageUrl = html(tags.image).attr().src;
    priceElementText = priceElementText.split('.');
    newPrice = priceElementText[0];
    newPrice = parseFloat(newPrice.replace(/\D/g, ""));
    return {
      name: productName,
      imageUrl: imageUrl,
      price: newPrice
    }
  },
  amazon: (tags, html) => {
    let productName = html(tags.name).text().trim();
    let priceElementText = html(tags.price).text();
    let imageUrl = html(tags.image).attr().src;
    priceElementText = priceElementText.split('.');
    newPrice = priceElementText[1];
    newPrice = parseFloat(newPrice.replace(/\D/g, ""));
    return {
      name: productName,
      imageUrl: imageUrl,
      price: newPrice
    }
  }
}
module.exports = scrape_host;
