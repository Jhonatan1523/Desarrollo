const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/api/data', userController.getUsers);

module.exports = router;