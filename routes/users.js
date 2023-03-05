const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');
const postController = require('../controllers/post_controller');

router.get('/profile', usersConrtoller.profile);
router.get('/post', postController.post);

router.get('/sign-up', usersConrtoller.signUp);
router.get('/sign-in', usersConrtoller.signIn);

router.post('/create', usersConrtoller.create);

module.exports = router;