const Auth = require("./auth");
const request = require("request");

class ShopWeDoApi {
  constructor(shopId, shopKey) {
    this.auth = new Auth(shopId, shopKey);
  }

  //methods

  post(endpoint, data, callback) {
    const options = {
      method: "POST",
      url: `https://api1.shopwedo.com/api/${endpoint}`,
      formData: {
        auth: this.auth.authJson,
        data: data,
      },
    };

    request(options, (error, response, body) => {
      callback(error, body);
    });
  }

  get(endpoint, callback) {
    const options = {
      method: "GET",
      url: `https://api1.shopwedo.com/api/${endpoint}`,
    };

    request(options, (error, response, body) => {
      callback(error, body);
    });
  }
}

module.exports = ShopWeDoApi;
