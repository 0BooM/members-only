const { Router } = require("express");
const RegistrationRouter = Router();
const RegistrationController = require("../controllers/RegistrationController");
const passport = require("../passport");

RegistrationRouter.get("/log-in", RegistrationController.getLoginForm);
RegistrationRouter.post("/log-in", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.render("registration/login", { error: info.message });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
});

RegistrationRouter.get("/sign-up", RegistrationController.getSignupForm);
RegistrationRouter.post("/sign-up", RegistrationController.postSignupForm);

RegistrationRouter.get("/log-out", RegistrationController.getLogoutForm);

module.exports = RegistrationRouter;