const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const validators = require("../middlewares/validators");
const commentController = require("../controllers/comment.controller");
const { body, param } = require("express-validator");


/**
 * @route POST /comments
 * @description Create a comment
 * @body { content, postId }
 * @access Login required
 */
router.post("/", authentication.loginRequired, 
validators.validate([
    body("content", "Missing content").exists().notEmpty(),
    body("postId", "Missing postId").exists().isString().custom(validators.checkObjectId),
]),
commentController.createComment);

/**
 * @route PUT /comments/:id
 * @description Update a comment
 * @body {content}
 * @access Login required
 */
router.put("/:id", authentication.loginRequired, 
validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    body("content", "Missing content").exists().notEmpty(),
]),
commentController.updateComment);

/**
 * @route DELETE /comments/:id
 * @description Delete a post
 * @access Login required
 */
router.delete("/:id", authentication.loginRequired, 
validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
]),
commentController.deleteComment);

/**
 * @route GET /comments/:id
 * @description Get details of a comment
 * @access Login required
 */
router.get("/:id", authentication.loginRequired, 
validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
]),
commentController.getSingleComment);

module.exports = router;