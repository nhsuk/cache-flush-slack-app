const errorBlocks = require('../lib/errorBlocks');
const successBlocks = require('../lib/successBlocks');

module.exports = async function buildMsg(context, input) {
  const { err, payload, res } = input;

  return {
    blocks: res ? successBlocks(payload) : errorBlocks(err),
    text: res ? 'Cache flush succeeded' : 'Cache flush failed',
  };
};
