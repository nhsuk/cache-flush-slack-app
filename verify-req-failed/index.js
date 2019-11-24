const blocksBuilder = require('../lib/blocksBuilder');
const { unauthorizedMsg } = require('../lib/messages');

module.exports = async function verifyRequestFailed(context) {
  context.log.error('Request signature did not match expected signature');
  return {
    blocks: blocksBuilder(unauthorizedMsg()),
    text: 'Invalid request signature',
  };
};
