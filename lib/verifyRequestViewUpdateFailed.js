const sectionBlock = require('./sectionBlockBuilder');

function msgContent() {
  return {
    blocks: [sectionBlock(':warning: The view was closed before the request was completed :warning:\nIf this was intentional you can ignore this message, otherwise please keep the view open in order to continue with the request.')],
    text: 'View must be open',
  };
}

module.exports = msgContent;
