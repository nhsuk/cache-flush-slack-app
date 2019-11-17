const sectionBlock = require('../lib/sectionBlockBuilder');

function processingBlocks() {
  return [
    sectionBlock(':information_source: Your request is being processed :information_source:\n\nIt will take several seconds to complete. Once complete, the status will be updated here and a direct message will be sent.\nThis view can be closed without affecting the request.'),
  ];
}

module.exports = processingBlocks;
