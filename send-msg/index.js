const rp = require('request-promise-native');
const { jsonContentTypeHeader } = require('../lib/constants');

module.exports = async function sendMsg(context, input) {
  const { blocks, channel, text } = input;

  const res = await rp({
    body: {
      blocks,
      channel,
      text,
    },
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN}`,
      'Content-Type': jsonContentTypeHeader,
    },
    json: true,
    method: 'POST',
    url: 'https://slack.com/api/chat.postMessage',
  });
  if (!res.ok) {
    throw new Error(JSON.stringify(res));
  }
};
