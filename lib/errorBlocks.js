const sectionBlock = require('../lib/sectionBlockBuilder');

function errorBlocks(err) {
  return [
    sectionBlock('The request to cache flush has not been executed :disappointed:. The details are:'),
    sectionBlock(`*Status code:* \`${err.statusCode}\``),
    sectionBlock(`*Error:*\n\`\`\`${JSON.stringify(err.error, null, '\t')}\`\`\``),
    sectionBlock('If the message indicates the problem can be resolved by changing the request please do so and try again.'),
  ];
}

module.exports = errorBlocks;
