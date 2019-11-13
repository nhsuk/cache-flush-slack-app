const rp = require('request-promise-native');
const { jsonContentTypeHeader } = require('../lib/constants');

module.exports = async function updateView(context, input) {
  const { view, viewId } = input;

  const res = await rp({
    body: {
      view,
      view_id: viewId,
    },
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN}`,
      'Content-Type': jsonContentTypeHeader,
    },
    json: true,
    method: 'POST',
    url: 'https://slack.com/api/views.update',
  });
  if (!res.ok) {
    throw new Error(JSON.stringify(res));
  }
};
