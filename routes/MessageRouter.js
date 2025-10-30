const { Router } = require("express");
const MessageRouter = Router();
const MessageController = require("../controllers/MessageController");
const isMember = require("../utils/authMiddleware").isMember;

MessageRouter.get(
  "/:id/create-message", isMember,
  MessageController.getCreateMessageForm
);

MessageRouter.post(
  "/:id/create-message", isMember,
  MessageController.postCreateMessageForm
);

module.exports = MessageRouter;
