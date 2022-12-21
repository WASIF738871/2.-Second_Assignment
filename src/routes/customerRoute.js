const express =require('express');
const customerController = require('../controllers/customerController')

const router = express.Router();

router.post('/signUp', customerController.signUp);

module.exports = router;