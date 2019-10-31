const express = require('express');
const router = express.Router();
const DB = require('../db/index');
const CryptoJS = require("crypto-js");
const config = require("../config/config.js")

router.post('/', async function(req, res, next) {

  let user = await DB.query('SELECT id FROM Users WHERE login = $login AND password = $password', req.body);

  if (user.rows[0]) {
    var ciphertext = CryptoJS.AES.encrypt(user.rows[0].id + '', config.SECRET_KEY);
    let response = {
      ACCESS_TOKEN: ciphertext.toString()
    }
    res.send(JSON.stringify(response));
  } else {
    // res.status(400);
    res.send('INCORRECT LOGIN OR PASSWORD');
  }

  res.end();
});

module.exports = router;
