// https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
exports.asyncMiddleware = (fn) => {
  (req, res, next) => {
    Promise.resolve(fn(req, rest, next))
      .catch(next);
  }
}

exports.catchErrors = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  }
}