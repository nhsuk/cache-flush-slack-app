const sectionBlock = require('../lib/sectionBlockBuilder');

function notAllowedBlocks(id, name) {
  return [
    sectionBlock(`:warning: You do not have access to this feature :warning:\n\nIf you think you should, please submit the following as a message in the #operations channel:\n\`@sdsupport @infra Please add me to the list of allowed users for the <@cache-flush> app. My name is '${name}' and my member ID is '${id}'\``),
  ];
}

module.exports = notAllowedBlocks;
