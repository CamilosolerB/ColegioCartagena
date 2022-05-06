const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('index');
})

router.get('/nosotros', (req,res)=>{
    res.sendFile(path.join(__dirname,'public/nosotros.html'))
})
router.get('/servicios',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/servicios.html'))
})
module.exports = router;