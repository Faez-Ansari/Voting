var express = require("express"),
  router = express.Router(),
  verifyToken = require("../middlewares/authJWT"),
  { signup, signin } = require("../controllers/auth.controller.js"),
  { getUser, deleteUserSession } = require("../controllers/getUser.js");

router.post("/register", signup);

router.post("/login", signin);

router.get("/login", getUser);

router.delete("/login", verifyToken, deleteUserSession);

module.exports = router;
