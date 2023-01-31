const { createAdmin } = require("../controllers/admin.js");
const { addGenre, getGenres } = require("../controllers/genre.js");
const {
  getVotes,
  postVote,
  deleteVote,
  countVotes,
} = require("../controllers/votes.js");

var express = require("express"),
  router = express.Router(),
  { signup, signin, getUsers } = require("../controllers/auth.controller.js"),
  { getUser, deleteUserSession } = require("../controllers/getUser.js");

router.post("/createAdmin", createAdmin);

router.post("/register", signup);
router.post("/login", signin);

router.get("/login", getUser);
router.get("/users", getUsers);

router.delete("/login", deleteUserSession);

router.get("/votes", getVotes);
router.get("/votecount", countVotes);
router.post("/vote", postVote);

router.post("/genre", addGenre);
router.get("/genres", getGenres);

module.exports = router;
