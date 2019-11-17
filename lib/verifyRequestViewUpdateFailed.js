const blocksBuilder = require('./blocksBuilder');
const { updateFailedMsg } = require('./messages');

function msgContent() {
  return {
    blocks: blocksBuilder(updateFailedMsg()),
    text: 'View must be open',
  };
}

module.exports = msgContent;
