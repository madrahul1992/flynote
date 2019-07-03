const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const expressionRoutes = require('./expression');

router.use('/exp', authenticate, expressionRoutes);

module.exports = router;
