const express = require('express');

const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.createView);
router.post('/create', controller.createAction);
router.get('/:id', controller.user);

module.exports = router;
