const sectionBlock = require('../lib/sectionBlockBuilder');

function processingBlocks() {
  return [
    sectionBlock('Your request is being processed, it will take several seconds to complete. The status of the request will be updated within this view, a direct message will also be sent.\nThis view can be closed without affecting the request.'),
  ];
}

module.exports = processingBlocks;
