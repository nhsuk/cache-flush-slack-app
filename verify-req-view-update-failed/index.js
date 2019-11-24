const blocksBuilder = require('../lib/blocksBuilder');
const { updateFailedMsg } = require('../lib/messages');

module.exports = async function verifyRequestFailed(context) {
  context.log.warn('The verified request view was unable to be updated as it had already been closed.');
  return {
    blocks: blocksBuilder(updateFailedMsg()),
    text: 'View must be open',
  };
};
