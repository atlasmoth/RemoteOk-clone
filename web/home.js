const express = require("express");
const { renderJobs } = require("../controllers/jobs");

const router = express.Router();

router.route("/").get(renderJobs);
module.exports = router;
