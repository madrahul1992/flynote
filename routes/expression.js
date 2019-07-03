const router = require('express').Router();
const bodmasController = require('../controllers/bodmas');

router.post('/', bodmasController.findOrCreate);

module.exports = router;