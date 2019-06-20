const express = require('express');

const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.createView);
router.post('/create', validate.createAction, controller.createAction);
router.get('/:id', controller.user);

module.exports = router;
