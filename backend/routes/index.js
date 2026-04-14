const router = require('express').Router();

const userRouter = require('./users');
const clothingItemsRouter = require('./clothingItems');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { validateSignup, validateSignin } = require('../middlewares/validation');

// Public routes
router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);
router.use('/items', clothingItemsRouter);

// Protected routes
router.use(auth);
router.use('/users', userRouter);

// 404
router.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;