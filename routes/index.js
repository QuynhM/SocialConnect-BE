var express = require('express');
var router = express.Router();

// authAPI
const authApi = require('./auth.api.js');
router.use("/auth", authApi)

// userApi
const userApi = require('./user.api.js');
router.use("/users", userApi)

// postApi
const postApi = require('./post.api.js');
router.use("/posts", postApi)

// commentApi
const commentApi = require('./comment.api.js');
router.use("/comments", commentApi)

// reactionApi
const reactionApi = require('./reaction.api.js');
router.use("/reactions", reactionApi)

// friendApi
const friendApi = require('./friend.api.js');
router.use("/friends", friendApi)

module.exports = router;
