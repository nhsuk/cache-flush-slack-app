const blocksBuilder = require('./blocksBuilder');
const { notAllowedMsg } = require('./messages');

function msgContent(id, name) {
  return {
    blocks: blocksBuilder(notAllowedMsg(id, name)),
    text: 'User not allowed',
  };
}

module.exports = msgContent;
