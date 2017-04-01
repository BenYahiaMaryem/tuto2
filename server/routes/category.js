const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category')
// declare axios for making http requests


/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

// Get all categories
router.get('/categories', categoryController.getCategories)

module.exports = router;