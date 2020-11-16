const { handleAsync } = require("../helpers/error");
const Job = require("../models/jobs");
const faker = require("faker");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports.getJobs = handleAsync(async function (req, res, next) {
  //
  const jobs = await Job.find({});
  res.send({
    success: true,
    jobs,
  });
});
module.exports.renderJobs = handleAsync(async function (req, res, next) {
  const jobs = await Job.find({});
  const marked = require("marked");
  res.render("index", { jobs, marked });
});
module.exports.remotely = handleAsync(async (req, res, next) => {
  res.render("remotely");
});
module.exports.createJob = handleAsync(async function (req, res, next) {
  const setup = {
    creator: req.user._id,
    location: {
      type: "Point",
      coordinates: [faker.address.longitude(), faker.address.latitude()],
    },
    position: faker.lorem.text(),
    companyName: faker.lorem.text(),
    logo: "images/dummy.jpg",
    salary: 50000,
    jobDescription: await promisify(fs.readFile)(path.resolve("demo.md"), {
      encoding: "utf-8",
    }),
    applyEmail: faker.internet.email(),
    applyUrl: faker.internet.url(),
    companyEmail: faker.internet.email(),
  };
  const job = new Job(setup);
  await job.save();
  res.send(job);
});

module.exports.create = handleAsync(async function (req, res, next) {
  const { position, companyName, tags, stripeToken } = req.body;
  const setup = {
    creator: `5faee9e05e1f270bb0c3a1ce`,
    location: {
      type: "Point",
      coordinates: [faker.address.longitude(), faker.address.latitude()],
    },
    position,
    companyName,
    range: "worldwide",
    logo: "images/dummy.jpg",
    salary: 50000,
    jobDescription: await promisify(fs.readFile)(path.resolve("demo.md"), {
      encoding: "utf-8",
    }),
    applyEmail: faker.internet.email(),
    applyUrl: faker.internet.url(),
    companyEmail: faker.internet.email(),
    tags: [...tags.split(",")],
  };

  const charge = await stripe.charges.create({
    amount: 300,
    currency: "usd",
    description: "Ad charge",
    source: stripeToken,
  });
  console.log(charge);
  const job = await Job.create(setup);

  res.redirect(301, "/");
});
