const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.admin');

//informacion del administrador
router.get('/',controller.veradministrador)

module.exports = router;
