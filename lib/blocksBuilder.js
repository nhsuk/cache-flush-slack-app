function sectionBlock(text) {
  return {
    text: {
      text,
      type: 'mrkdwn',
    },
    type: 'section',
  };
}

function blocksBuilder(msg) {
  return [sectionBlock(msg)];
}

module.exports = blocksBuilder;
