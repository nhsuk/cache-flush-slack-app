const notAllowedBlocks = require('../lib/notAllowedBlocks');

function msgContent(id, name) {
  return {
    blocks: notAllowedBlocks(id, name),
    text: 'User not allowed',
  };
}

module.exports = msgContent;
