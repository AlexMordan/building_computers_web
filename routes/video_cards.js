const express = require('express');
const router = express.Router();
const video_cards = require('../db/controllers/video_cards');
const auth = require('../middleware');
router.post('/upsert', async function(req, res, next) {
  let result = await video_cards.upsert(req.body);
  if (result !== 'SUCCESS') {
    res.status(500);
  }
  res.send(JSON.stringify(result));
  res.end();
});

router.get('/get', async function(req, res, next) {
  let result = await video_cards.getAllData(req.query);
  if (result) {
    res.status(200);
  }
  res.send(result);
});

router.delete('/delete', async function(req, res, next) {
  if (req.query && !req.query.id) {
    res.status(400);
    res.send('Bad request!!');
    res.end();
    return;
  }
  let result = await video_cards.deleteRecods(req.query);
  res.send(result);
  res.end();
});

module.exports = router;
