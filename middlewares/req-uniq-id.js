const createNamespace = require('cls-hooked').createNamespace;
const session = createNamespace('session');
const uniqId = require('uniqid');

module.exports = (req, res, next) => {
  session.bindEmitter(req);
  session.bindEmitter(res);
  session.run(() => {
    session.set('uniqId', uniqId());
    next();
  });
}