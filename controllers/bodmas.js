const Bodmas = require('../models/bodmas');
const logger = require('../utils/logger');
const { validate } = require('../utils/validation');
const createError = require('http-errors');

module.exports = {
  findOrCreate: async (req, res, next) => {
    const expression = req.body.expression;
    try {
      logger.info('expression: ', { expression });
      if(validate(expression)){
        // Check if expression is already present in the database
        const result = await Bodmas.findOne({ expression });
        if (result) {
          res.status(200).json({ answer: result.answer })
        } else {
          const answer = eval(expression);
          const bodmas = new Bodmas({ expression, answer });
          // Add expression to the database
          bodmas.save();
          res.status(200).json({ answer })
        }
      } else {
        next(createError(400, 'Please provide valid expression'));
      }
    } catch (error) {
      logger.error(error.message, { expression, stack: error.stack });
      next(createError(400, error.message));
    }
  } 
}
