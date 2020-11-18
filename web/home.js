const express = require("express");
const { renderJobs, remotely, create, search } = require("../controllers/jobs");

const router = express.Router();

router.route("/").get(renderJobs);
router.route("/remotely").get(remotely);
router.route("/create").post(create);
router.route("/search").post(search);
module.exports = router;
