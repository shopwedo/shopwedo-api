# shopwedo-api

## This is an npm package to use the ShopWeDo api.

How to install:

```
npm install shopwedo-api
```

To make a get request:

```
const ShopWeDoApi = require('shopwedo-api');

ShopWeDoApi.get('endpointWithGetRequest', (error, body) => {
    if(error) ...
    else ...
});
```

To make a post request:

```
const ShopWeDoApi = require('shopwedo-api');

const data = {some: "data"};

ShopWeDoApi.post('endpointWithPostRequest', data, (error, body) => {
    if(error) ...
    else ...
});
```
