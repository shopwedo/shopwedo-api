//IMPORTS
const express = require("express");
const Auth = require("./auth");
const request = require("request");
const cors = require("cors");
require("dotenv").config();

//CONSTANTS
const app = express();
const port = 3001;
const auth = new Auth(process.env.SHOP_ID, process.env.SHOP_KEY);

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//ROUTES

// getOrder
app.get("/api/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const zip = req.query.zip;

  const options = {
    method: "POST",
    url: "https://admin.shopwedo.com/api/getOrder",
    formData: {
      auth: auth.authJson,
      data: `{'order_id': ${orderId}}`,
    },
  };

  request(options, (error, response, body) => {
    if (error) res.status(400).send(error.response.data.message);
    else {
      const order = JSON.parse(body);
      if (order[0] && order[0].shipping_address.zip === zip)
        res.status(200).send({ order });
      else res.status(404).send({ error: "Order not found." });
    }
  });
});

// saveRetour
app.post("/api/retour", (req, res) => {
  const data = JSON.stringify(req.body);

  const options = {
    method: "POST",
    url: "https://admin.shopwedo.com/api/createRetourAnnouncement",
    formData: {
      auth: auth.authJson,
      data: data,
    },
  };

  request(options, (error, response, body) => {
    if (error) res.status(400).send(error.response.data.message);
    else {
      const retour = JSON.parse(body);
      res.status(200).send(retour);
    }
  });
});

// getRetourSetting
app.get("/api/retourSetting/:id", (req, res) => {
  const shopId = req.params.id;

  const options = {
    method: "POST",
    url: "https://admin.shopwedo.com/api/getRetourSettings",
    formData: {
      auth: auth.authJson,
      data: `{ 'shop_id': ${shopId} }`,
    },
  };

  request(options, (error, response, body) => {
    console.log(error);
    if (error) res.status(400).send(error.response.data.message);
    else {
      console.log(body);
      res.status(200).send(body);
    }
  });
});

// getLocations
app.post("/api/pudo", (req, res) => {
  const data = JSON.stringify(req.body);

  const options = {
    method: "POST",
    url: "https://admin.shopwedo.com/api/pudo",
    formData: {
      auth: auth.authJson,
      data: data,
    },
  };

  request(options, (error, response) => {
    if (error) res.status(400).send(error.response.data.message);
    else {
      res.status(200).send(response.body);
    }
  });
});

// test
app.get("/test", (req, res) => {
  const options = {
    method: "POST",
    url: "https://admin.shopwedo.com/api/authTest",
    formData: {
      auth: auth.authJson,
      data: "",
    },
  };

  request(options, (error, response, body) => {
    if (error) res.send({ message: error.response.data.message });
    else res.send({ data: response });
    console.log(body);
  });
});

//PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
