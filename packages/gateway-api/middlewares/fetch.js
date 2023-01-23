// Middleware to pass on request ID
function fetch(req, res, next) {
  const requestId = req.get('x-request-id');
  if (requestId) {
    // Set the request ID on the response
    res.set('x-request-id', requestId);
    // Create a fetch proxy that sets the request ID on the request
    req.fetch = (url, options) => {
      options = options || {};
      options.headers = options.headers || {};
      options.headers['x-request-id'] = requestId;
      return fetch(url, options);
    }
  }
  next();
}
