const { Router } = require("express");
const RegistrationRouter = Router();
const RegistrationController = require("../controllers/RegistrationController");

RegistrationRouter.get("/log-in", RegistrationController.getLoginPage);

RegistrationRouter.get("/sign-up", RegistrationController.getSignupPage);

module.exports = RegistrationRouter;