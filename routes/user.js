var express = require("express"),
  router = express.Router(),
  verifyToken = require("../middlewares/authJWT"),
  { signup, signin } = require("../controllers/auth.controller.js");

router.post("/register", signup);

router.post("/login", signin);

module.exports = router;
