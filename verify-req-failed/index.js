const verifyRequestFailedMsg = require('../lib/verifyRequestFailedMsg');

module.exports = async function verifyRequestFailed(context) {
  context.log.error('Request signature did not match expected signature');
  return verifyRequestFailedMsg();
};
