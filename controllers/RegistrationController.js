// const db = require("../db/registrationQueries");

const { Router } = require("express");

exports.getLoginPage = async (req, res) => {
    res.render("registration/login");
}

exports.getSignupPage = async (req, res) => {
    res.render("registration/signup")
}
