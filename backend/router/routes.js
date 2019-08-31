const express = require('express');
const router = new express.Router();
const discordCallback = require('./resources/discord');
const whitelist = require('./resources/whitelist');
const vld = require('./validate')

router.get('/discord/callback', discordCallback);
router.post('/receive_whitelist', vld.validate, whitelist);

module.exports = router;
