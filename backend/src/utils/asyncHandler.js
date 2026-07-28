// Wraps an async route handler so rejected promises are passed to Express's
// error middleware instead of crashing the process or needing try/catch everywhere.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
