function sectionBlock(text) {
  return {
    text: {
      text,
      type: 'mrkdwn',
    },
    type: 'section',
  };
}

module.exports = sectionBlock;
