const { Router } = require('express');

const userRouter = require('./users.router');
const postRouter = require('./posts.router');

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);

module.exports = router;
