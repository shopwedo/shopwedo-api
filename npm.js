// const express = require("express");
const Auth = require("./auth");
const request = require("request");
// const cors = require("cors");
// require("dotenv").config();

//CONSTANTS
// const app = express();
// const port = 3001;
// const auth = new Auth(process.env.SHOP_ID, process.env.SHOP_KEY);

//MIDDLEWARE
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

class Package {
  #shopId;
  #shopKey;

  constructor(shopId, shopKey) {
    this.#shopId = shopId;
    this.#shopKey = shopKey;
    this.auth = new Auth(shopId, shopKey);
  }

  //methods
  logParams() {
    console.log(`shopId = ${this.#shopId}\nshopKey = ${this.#shopKey}`);
  }

  request(endpoint, data, method, callback) {
    const options = {
      method: method || "POST",
      url: `https://admin.shopwedo.com/api/${endpoint}`,
      formData: {
        auth: this.auth.authJson,
        data: data,
      },
    };

    request(options, (error, response, body) => {
      callback(error, body);
    });
  }
}

module.exports = Package;
