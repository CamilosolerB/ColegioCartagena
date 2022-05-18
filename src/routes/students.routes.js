const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.student');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/static/students");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname +
          "-" +
          req.session.identificacion +
          "-" +
          Date.now() +
          ".png"
      );
    },
  });
  const uploads = multer({ storage });
  

router.get('/',controller.verestudiantes)

module.exports = router;