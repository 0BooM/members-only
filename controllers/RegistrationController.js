// const db = require("../db/registrationQueries");
const passport = require("../passport")
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

exports.getLoginForm = async (req, res) => {
    res.render("registration/login");
}

exports.getSignupForm = async (req, res) => {
    res.render("registration/signup")
}
exports.postSignupForm = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        req.body.username,
        hashedPassword,
    ]);
    res.redirect("/")
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getLogoutForm = async(req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        res.redirect("/")
    });
}
