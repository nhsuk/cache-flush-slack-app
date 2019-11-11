const sectionBlock = require('../lib/sectionBlockBuilder');

function notAllowedBlocks() {
  return [
    sectionBlock(':warning: You are not on the allowed users list :warning:\nPlease create a message in the #operations channel mentioning `@infra` and include your <https://api.slack.com/messaging/composing/formatting#mentioning-users|member ID>.'),
  ];
}

module.exports = notAllowedBlocks;
