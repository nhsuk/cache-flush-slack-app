const qs = require('querystring');
const rp = require('request-promise-native');

const openView = require('./views/open.json');

module.exports = async function initialView(context, req) {
  rp({
    body: {
      trigger_id: qs.decode(req.body).trigger_id,
      view: openView,
    },
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN}`,
    },
    json: true,
    method: 'POST',
    url: 'https://slack.com/api/views.open',
  });
};
