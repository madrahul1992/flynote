module.exports = {
  validate: (expression) => {
    return (expression && typeof expression === 'string' && !isNaN(eval(expression)));
  }
}