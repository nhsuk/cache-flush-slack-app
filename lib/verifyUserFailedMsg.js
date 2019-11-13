const notAllowedBlocks = require('../lib/notAllowedBlocks');

function msgContent() {
  return {
    blocks: notAllowedBlocks(),
    text: 'User not allowed',
  };
}

module.exports = msgContent;
