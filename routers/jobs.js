const express = require("express");
const { getJobs, createJob } = require("../controllers/jobs");
const { auth } = require("../controllers/users");

const router = express.Router();

router.route("/").get(getJobs).post(auth, createJob);

module.exports = router;
