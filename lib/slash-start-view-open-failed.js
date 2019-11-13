const unauthorizedBlocks = require('../lib/unauthorizedBlocks');

function msgContent() {
  return {
    blocks: unauthorizedBlocks(),
    text: 'Invalid request signature',
  };
}

module.exports = msgContent;
