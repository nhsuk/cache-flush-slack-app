const sectionBlock = require('../lib/sectionBlockBuilder');

function waitingBlocks() {
  return [
    sectionBlock(':information_source: Making sure everything is in order.\n:information_source: Please do not close this window.'),
  ];
}

module.exports = waitingBlocks;
