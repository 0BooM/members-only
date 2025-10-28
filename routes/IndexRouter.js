const { Router } = require("express");
const IndexRouter = Router();
const IndexController = require("../controllers/IndexController");
const isAuth = require("../utils/authMiddleware").isAuthenticated;
const isMember = require("../utils/authMiddleware").isMember;

IndexRouter.get("/", IndexController.getMessages);

//Update user membership status
IndexRouter.get("/become-member/:id", IndexController.becomeMember);

IndexRouter.get("/protected-route", isAuth, (req, res, next) => {
  res.send("Hello, you are authorized!");
});

IndexRouter.get("/member-area", isMember, (req, res) => {
  res.send("Welcome, member!");
});

module.exports = IndexRouter;
