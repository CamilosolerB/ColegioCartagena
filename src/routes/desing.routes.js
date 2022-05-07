const express = require('express');
const path = require('path');
const router = express.Router();
const login = require('../controller/controller.login');

router.get('/', (req,res)=>{
    res.render('index');
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/cerrar',login.cerrarsesion)
/* Calling the function `iniciosesion` from the file `controller.login.js` */
router.post('/login',login.iniciosesion);
module.exports = router;