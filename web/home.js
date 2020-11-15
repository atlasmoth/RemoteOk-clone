const express = require("express");
const { renderJobs, remotely, create } = require("../controllers/jobs");

const router = express.Router();

router.route("/").get(renderJobs);
router.route("/remotely").get(remotely);
router.route("/create").post(create);
module.exports = router;
