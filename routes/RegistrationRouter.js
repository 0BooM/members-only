const { Router } = require("express");
const RegistrationRouter = Router();
const RegistrationController = require("../controllers/RegistrationController");
const passport = require("../passport");

RegistrationRouter.get("/log-in", RegistrationController.getLoginForm);
RegistrationRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

RegistrationRouter.get("/sign-up", RegistrationController.getSignupForm);
RegistrationRouter.post("/sign-up", RegistrationController.postSignupForm);

RegistrationRouter.get("/log-out", RegistrationController.getLogoutForm);

module.exports = RegistrationRouter;