const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.cursos');

router.post('/crearcurso',controller.crearcurso);
router.get('/:id',controller.asignarprofesores);
module.exports = router;