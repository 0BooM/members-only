const { Router } = require("express");
const IndexRouter = Router();
const IndexController = require("../controllers/IndexController");
const isAuth = require("../utils/authMiddleware").isAuthenticated;
const isMember = require("../utils/authMiddleware").isMember;
const isAdmin = require("../utils/authMiddleware").isAdmin;

IndexRouter.get("/", IndexController.getMessages);

//Update user membership status
IndexRouter.get("/become-member/:id", isAuth, IndexController.getBecomeMember);
IndexRouter.post("/become-member/:id", isAuth, IndexController.postBecomeMember);


//Become admin form
IndexRouter.get("/admin", isAuth, IndexController.getAdminForm);
IndexRouter.post("/admin/:id", isAuth, IndexController.postAdminForm);

//Delete post route
IndexRouter.post("/delete/:id", isAdmin, IndexController.deleteMessage);

module.exports = IndexRouter;
