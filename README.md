# shopwedo-api

## This is an npm package to use the ShopWeDo api.

How to install:

```
npm install shopwedo-api
```

To make a get request:

```
const ShopWeDoApi = require('shopwedo-api');

const shopWeDoApi = new ShopWeDoApi(shopId, shopKey);

// param1: String of endpoint (shopwedo-api-url/endpoint)
// param2: callback function
shopWeDoApi.get('endpoint', (error, body) => {
    if(error) console.log("There is an error.");
    else console.log("Successful request.");
});
```

To make a post request:

```
const ShopWeDoApi = require('shopwedo-api');

const shopWeDoApi = new ShopWeDoApi(shopId, shopKey);

const data = '{'some': data}';

// param1: String of endpoint (shopwedo-api-url/endpoint)
// param2: JSON as a string for body of POST request
// param3: callback function
shopWeDoApi.post('endpoint', data, (error, body) => {
    if(error) console.log("There is an error.");
    else console.log("Successful request.");
});
```
