const sectionBlock = require('../lib/sectionBlockBuilder');

function waitingBlocks() {
  return [
    sectionBlock(':information_source: Please do not close this window :information_source:\n\nChecking everything is in order before proceeding.'),
  ];
}

module.exports = waitingBlocks;
