const express = require('express');
const controller = require('../controllers/mail');
const router = express.Router();

router.post('/', controller.send);

module.exports = router;