const { handleAsync } = require("../helpers/error");
const Job = require("../models/jobs");
const faker = require("faker");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

module.exports.getJobs = handleAsync(async function (req, res, next) {
  //
  const jobs = await Job.find({});
  res.send({
    success: true,
    jobs,
  });
});

module.exports.createJob = handleAsync(async function (req, res, next) {
  const setup = {
    location: {
      type: "Point",
      coordinates: [faker.address.longitude(), faker.address.latitude()],
    },
    position: faker.lorem.text(),
    companyName: faker.lorem.text(),
    logo: faker.lorem.text(),
    salary: 50000,
    jobDescription: await promisify(fs.readFile)(path.resolve("demo.md"), {
      encoding: "utf-8",
    }),
    applyEmail: faker.internet.email(),
    applyUrl: faker.internet.url(),
    companyEmail: faker.internet.email(),
  };
  res.send(setup);
});
