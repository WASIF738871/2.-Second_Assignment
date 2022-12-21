const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router();

router.post('/createCard', cardController.createCard);

module.exports =router;