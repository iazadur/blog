const { Router } = require('express');

const userRouter = require('./users.router');
const postRouter = require('./posts.router');
const commentRouter = require('./comment.router');

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

module.exports = router;
