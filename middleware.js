const CryptoJS = require("crypto-js");
const config = require("./config/config.js")

checkToken = function(req, res, next) {
    return function (req, res, next) {
        if (req.headers.access_token) {
            var bytes  = CryptoJS.AES.decrypt(req.headers.access_token, config.SECRET_KEY);
            var plaintext = bytes.toString(CryptoJS.enc.Utf8);
            if (plaintext !== null && plaintext !== undefined && plaintext !== '') {
                next();
            } else {
                res.status(401);
                res.send('go to home2!!!');
            }

        } else {
            res.status(401);
            res.send('go to home!!!');
        }
    }
}
module.exports = {
    checkToken: checkToken
}