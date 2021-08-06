const crypto = require('crypto-js');

class Auth {
    constructor(shopId, shopKey) {
        this.shopId = shopId,
        this.shopKey = shopKey
    };

    // Getters
    get authJson() {
        return this.generateAuthJson();
    }

    //Methods
    generateAuthJson() {
        Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

        const shopid = this.shopId;
        const shopkey = this.shopKey;
        const timestamp = ((new Date().getTime())/1000);
        const salt = 'dfvoijerhiugvezhgiuezrhg'; //crypto.lib.WordArray.random(128 / 8);
            
        //A unique hash HMAC SHA-512 encrypted string of the concatenation of the shop ID, shop KEY, timestamp and salt.
        const tokenInput = `${shopid}${shopkey}${timestamp}${salt}`;

        const token = crypto.HmacSHA512(tokenInput, shopkey).toString();

        return JSON.stringify({
            "shopid": shopid,
            "timestamp": timestamp,
            "salt": salt,
            "token": token
        });
    }
}

module.exports = Auth;