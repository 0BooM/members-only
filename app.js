const e = require("express");
const express = require("express");
const { error } = require("node:console");
const app = express();
const path = require("node:path");
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Homepage
app.get("/", (req, res) => {
  res.render("index");
});

//Login and Signup
const registrationRouter = require("./routes/RegistrationRouter");
app.use("/", registrationRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log("Listening on port:", PORT);
});
