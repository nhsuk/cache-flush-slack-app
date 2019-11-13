const sectionBlock = require('../lib/sectionBlockBuilder');

function waitingBlocks() {
  return [
    sectionBlock('Checking validity of the request and if you are allowed to proceed.\nAs soon as the checks are complete the next view will be displayed.'),
  ];
}

module.exports = waitingBlocks;
