require("dotenv").config();
const express = require("express");
const faker = require("faker");
const { default: validator } = require("validator");
const initDb = require("./db");
const jobsRouter = require("./routers/jobs");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

console.log(faker.address.latitude());
console.log(validator.isEmail("ebuka422@gmail.com"));

app.use("/api/jobs", jobsRouter);

app.all("/*", (req, res, next) => {
  next(new Error("Wrong Route"));
});
app.use((error, req, res, next) => {
  res.send({
    success: false,
    message: error.message,
  });
});

initDb()
  .then(() => {
    app.listen(process.env.PORT || 5000, console.log);
  })
  .catch(console.table);

process.on("unhandledRejection", (e) => {
  console.table(e);
  process.exit(1);
});
process.on("uncaughtException", () => {
  console.table(e);
  process.exit(1);
});
