require("dotenv").config();
const express = require("express");
const faker = require("faker");
const initDb = require("./db");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

console.log(faker.address.latitude());

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
