const verifyRequest = require('../lib/verifyRequest');

module.exports = async function verifyReq(context, req) {
  return verifyRequest(req);
};
