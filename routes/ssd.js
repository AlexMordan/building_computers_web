const express = require('express');
const router = express.Router();
const ssd = require('../db/controllers/ssd');
const auth = require('../middleware');
router.post('/upsert', auth.checkToken(), async function(req, res, next) {
  let result = await ssd.upsert(req.body);
  if (result !== 'SUCCESS') {
    res.status(500);
  }
  res.send(JSON.stringify(result));
  res.end();
});

router.get('/get', auth.checkToken(), async function(req, res, next) {
  let result = await ssd.getAllData(req.query);
  if (result) {
    res.status(200);
  }
  res.send(result);
});

router.delete('/delete', auth.checkToken(), async function(req, res, next) {
  if (req.query && !req.query.id) {
    res.status(400);
    res.send('Bad request!!');
    res.end();
    return;
  }
  let result = await ssd.deleteRecods(req.query);
  res.send(result);
  res.end();
});

module.exports = router;
