const isUserValid = require('../lib/verifyUser');

module.exports = async function verifyUser(context, userId) {
  return isUserValid(userId);
};
