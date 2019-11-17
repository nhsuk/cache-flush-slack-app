const sectionBlock = require('../lib/sectionBlockBuilder');

function unauthorizedBlocks() {
  return [
    sectionBlock(':warning: The request can not be verified :warning:\n\nNo further processing will take place.\nContact the app developer if you believe this is an error.'),
  ];
}

module.exports = unauthorizedBlocks;
