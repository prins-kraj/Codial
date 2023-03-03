const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');
const postController = require('../controllers/post_controller');

router.get('/profile', usersConrtoller.profile);
router.get('/post', postController.post);


module.exports = router;