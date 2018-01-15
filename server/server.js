const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Dogs = require("../models/dogs");
const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "brianhallerweb",
  api_key: "574846749284825",
  api_secret: "-G1krosA4aRXET_T28tOoKE6C-Y"
});

mongoose.connect("mongodb://localhost/dogsMulter");

app.use(bodyParser.json());

app.get("/dogs", function(req, res) {
  Dogs.find(function(err, dogs) {
    res.json(dogs);
  });
});

app.post("/upload", upload.single("myImage"), function(req, res) {
  cloudinary.v2.uploader
    .upload_stream({ resource_type: "raw" }, function(error, result) {
      var newDog = new Dogs({
        name: req.body.name,
        owner: req.body.owner,
        filePath: result.secure_url
      });
      newDog.save(function(err, result) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(result);
        }
      });
    })
    .end(req.file.buffer);
});

app.listen(3001);
