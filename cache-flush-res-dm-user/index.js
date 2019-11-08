const rp = require('request-promise-native');

module.exports = async function dmUser(context, input) {
  const { blocks, channel, text } = input;

  try {
    const res = await rp({
      body: {
        blocks,
        channel,
        text,
      },
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN}`,
      },
      json: true,
      method: 'POST',
      url: 'https://slack.com/api/chat.postMessage',
    });
    if (!res.ok) {
      context.log.error('Error processing chat.postMessage');
      context.log.error(res);
    }
  } catch (err) {
    context.log.error('Error occurred sending chat.postMessage');
    context.log.error(err);
  }
};
