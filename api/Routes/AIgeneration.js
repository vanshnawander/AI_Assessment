const express = require("express");
const router = express.Router();
const multer  = require('multer')
const {JobDescriptionGenerator} = require('../controllers/JobDescAIController');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname); // Rename file with timestamp
    }
  });
const upload = multer({ storage });


router.post("/JobDescriptiongenerate",upload.single('pdfFile') ,JobDescriptionGenerator);