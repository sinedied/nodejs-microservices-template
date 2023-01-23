const crypto = require('crypto');

// Middleware to pass on request ID
function requestId(req, res, next) {
  const requestId = req.get('x-correlation-id') || crypto.randomUUID();
  // Set the request ID on the response
  res.set('x-correlation-id', requestId);
  // Create a fetch proxy that sets the request ID on the request
  req.fetch = (url, options) => {
    options = options || {};
    options.headers = options.headers || {};
    options.headers['x-correlation-id'] = requestId;
    return fetch(url, options);
  }
  next();
}


module.exports = requestId;
