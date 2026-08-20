const router = require('express').Router();

const userRouter = require('./users');
const itemsRouter = require('./items');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

// Public routes
router.post('/signup', createUser);
router.post('/signin', login);
router.use('/items', itemsRouter);

// Protected routes
router.use(auth);
router.use('/users', userRouter);

// 404 
router.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

module.exports = router;