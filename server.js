require("dotenv").config();
const express = require("express");
const faker = require("faker");

const initDb = require("./db");
const jobsRouter = require("./routers/jobs");
const usersRouter = require("./routers/users");
const webRouter = require("./web/home");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/api/jobs", jobsRouter);
app.use("/api/users", usersRouter);

app.use("/", webRouter);

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
