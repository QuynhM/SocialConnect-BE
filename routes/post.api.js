const express = require("express");
const authentication = require("../middlewares/authentication");
const postController = require("../controllers/post.controller");
const router = express.Router();
const { body, param } = require("express-validator");
const validators = require("../middlewares/validators");

/**
 * @route GET /posts/user/:userId?page=1&limit=10
 * @description Get all posts an user can see with pagination
 * @access Login required
 */
router.get("/user/:userId", validators.validate([
    param("userId").exists().isString().custom(validators.checkObjectId),
]), postController.getPosts)

/**
 * @route POST /posts
 * @description Create a new post
 * @body {content, image }
 * @access Login required
 */
router.post("/", authentication.loginRequired, 
validators.validate([body("content", "Missing content").exists().notEmpty()]),
postController.createPost);

/**
 * @route PUT /posts/:id
 * @description Update a post
 * @body { content, image }
 * @access Login required
 */
router.put('/:id', authentication.loginRequired,validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
]), postController.updatePost);

/**
 * @route DELETE /posts/:id
 * @description Delete a post
 * @access Login required
 */
router.delete('/:id', authentication.loginRequired, validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
]), postController.deleteSinglePost);


/**
 * @route GET /posts/:id
 * @description Get a single post
 * @access Login required
 */
router.get('/:id', authentication.loginRequired, validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
]), postController.getSinglePost);

/**
 * @route GET /posts/:id/comments
 * @description Get comments of a post
 * @access Login required
 */
router.get("/:id/comments", authentication.loginRequired,
validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
]),
postController.getCommentsOfPost)

module.exports = router;