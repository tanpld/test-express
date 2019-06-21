const shortid = require('shortid');

const db = require('../db');

module.exports = (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    let sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true,
    });

    db.get('sessions')
      .push({ id: sessionId })
      .write();
  }

  const user = db
    .get('users')
    .find({ id: req.signedCookies.userId })
    .value();

  res.locals.user = user;

  const sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    return;
  } else {
    const cart = db
      .get('sessions')
      .find({ id: sessionId })
      .get('cart')
      .value();
    let totalItems = Object.keys(cart).reduce(
      (total, item) => total + cart[item],
      0,
    );
    res.locals.totalItems = totalItems;
  }

  next();
};
