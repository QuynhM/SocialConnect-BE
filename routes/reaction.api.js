const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");
const authentication = require("../middlewares/authentication");
const reactionController = require("../controllers/reaction.controller");


/**
 * @route POST /reactions
 * @description Save a reaction to post or comment
 * @body { targetType: 'Post' or 'Comment', targetId, emoji: 'like' or 'dislike' }
 * @access Login required
 */
router.post("/", authentication.loginRequired, validators.validate([
    body("targetType", "Invalid targetTuype").exists().isIn(["Post", "Comment"]),
    body("targetId", "Invalid targetId").exists().custom(validators.checkObjectId),
    body("emoji", "Invalid emoji").exists().isIn(["like", "dislike"]),
]),
reactionController.saveReaction);

module.exports = router;