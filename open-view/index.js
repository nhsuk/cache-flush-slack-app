const rp = require('request-promise-native');
const { jsonContentTypeHeader } = require('../lib/constants');

const view = require('./views/open.json');

module.exports = async function openView(context, payload) {
  // eslint-disable-next-line camelcase
  const { text, trigger_id } = payload;

  // Set URLs to whatever text was included
  view.blocks[1].element.initial_value = text;
  const res = await rp({
    body: {
      trigger_id,
      view,
    },
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN}`,
      'Content-Type': jsonContentTypeHeader,
    },
    json: true,
    method: 'POST',
    url: 'https://slack.com/api/views.open',
  });
  if (!res.ok) {
    throw new Error(JSON.stringify(res));
  }
};
