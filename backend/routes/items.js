const router = require('express').Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require('../controllers/items');

const auth = require('../middlewares/auth');
const {
  validateCreateItem,
  validateItemId,
} = require('../middlewares/validation');

router.get('/', getItems);

router.use(auth);

router.post('/', validateCreateItem, createItem);
router.delete('/:id', validateItemId, deleteItem);
router.put('/:id/likes', validateItemId, likeItem);
router.delete('/:id/likes', validateItemId, unlikeItem);

module.exports = router;