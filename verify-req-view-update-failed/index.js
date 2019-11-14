const verifyRequestViewUpdateFailed = require('../lib/verifyRequestViewUpdateFailed');

module.exports = async function verifyRequestFailed(context) {
  context.log.warn('The verified request view was unable to be updated as it had already been closed.');
  return verifyRequestViewUpdateFailed();
};
