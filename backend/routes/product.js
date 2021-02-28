const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const multer = require("multer");
const { ManProduct, WomanProduct, KidProduct } = require("../models/Product");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/uploadImage", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ fileUploadSuccess: false, err });
    }
    return res.json({
      fileUploadSuccess: true,
      filePath: res.req.file.path,
      fillName: res.req.file.filename,
    });
  });
});

router.post("/uploadProduct/man", auth, (req, res) => {
  const product = new ManProduct(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ upLoadProductSuccess: true });
  });
});

router.post("/uploadProduct/woman", auth, (req, res) => {
  const product = new WomanProduct(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ upLoadProductSuccess: true });
  });
});

router.post("/uploadProduct/kid", auth, (req, res) => {
  const product = new KidProduct(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ upLoadProductSuccess: true });
  });
});

module.exports = router;
