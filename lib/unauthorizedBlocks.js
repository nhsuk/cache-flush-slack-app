const sectionBlock = require('../lib/sectionBlockBuilder');

function unauthorizedBlocks() {
  return [
    sectionBlock(':warning: The request looks like it hasn\'t come from a valid source.\n:warning: No further processing will take place.\n:warning: Contact the app developer if you believe this is an error.'),
  ];
}

module.exports = unauthorizedBlocks;
