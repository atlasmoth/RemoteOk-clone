const express = require("express");
const { renderJobs, remotely } = require("../controllers/jobs");

const router = express.Router();

router.route("/").get(renderJobs);
router.route("/remotely").get(remotely);
module.exports = router;
