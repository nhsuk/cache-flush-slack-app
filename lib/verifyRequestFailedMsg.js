const blocksBuilder = require('./blocksBuilder');
const { unauthorizedMsg } = require('./messages');

function msgContent() {
  return {
    blocks: blocksBuilder(unauthorizedMsg()),
    text: 'Invalid request signature',
  };
}

module.exports = msgContent;
