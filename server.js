require("dotenv").config();
const express = require("express");
const faker = require("faker");
const { default: validator } = require("validator");
const initDb = require("./db");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

console.log(faker.address.latitude());
console.log(validator.isEmail("https://google.com"));

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
