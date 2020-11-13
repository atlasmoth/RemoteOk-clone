const express = require("express");
const { getJobs, createJob } = require("../controllers/jobs");

const router = express.Router();

router.route("/").get(getJobs).post(createJob);

module.exports = router;
