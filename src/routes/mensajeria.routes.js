const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.mensajeria')

router.get('/sendemail',controller.enviarmail);

module.exports = router;