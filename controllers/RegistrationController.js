// const db = require("../db/registrationQueries");
const passport = require("../passport");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const { body, validationResult, matchedData } = require("express-validator");

const validateUserData = [
  body("username").trim().notEmpty().withMessage(`Username can't be empty.`),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long."),
  body("conf_password")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    })
    .withMessage("Passwords do not match."),
];

exports.getLoginForm = async (req, res) => {
  res.render("registration/login");
};

exports.getSignupForm = async (req, res) => {
  if (!req.isAuthenticated()) res.render("registration/signup");
  else res.redirect("/");
};
exports.postSignupForm = [
  validateUserData,
  async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
      return res.render("registration/signup", { errors: errors.array(), data: req.body })
    }
    try {
      if (!req.isAuthenticated()) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query(
          "INSERT INTO users (username, password) VALUES ($1, $2)",
          [req.body.username, hashedPassword]
        );
      }
      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
];
exports.getLogoutForm = async (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
};
