const sectionBlock = require('../lib/sectionBlockBuilder');

function notAllowedBlocks() {
  return [
    sectionBlock(':warning: You are not on the allowed users list :warning:\nPlease create a message in the #operations channel based on the following template:\n`@sdsupport @infra Please add me to the list of allowed users for the <@cache-flush> app. My member ID is <MEMBERID>`.\n`<MEMBERID>` should be replaced with your own member id which can be found within your profile. Follow <https://api.slack.com/messaging/composing/formatting#mentioning-users|this link> for more detailed instructions.'),
  ];
}

module.exports = notAllowedBlocks;
