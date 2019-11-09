const qs = require('querystring');
const rp = require('request-promise-native');
const isRequestValid = require('../lib/verifyRequest');

const openView = require('./views/open.json');

module.exports = async function slashStart(context, req) {
  if (isRequestValid(req)) {
    openView.blocks[1].element.initial_value = qs.parse(req.body).text;
    try {
      const res = await rp({
        body: {
          trigger_id: qs.decode(req.body).trigger_id,
          view: openView,
        },
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        json: true,
        method: 'POST',
        url: 'https://slack.com/api/views.open',
      });
      if (!res.ok) {
        context.log.error('Error processing views.open');
        context.log.error(res);
      }
    } catch (err) {
      context.log.error('Error occurred sending views.open');
      context.log.error(err);
    }
    return null;
  }
  context.log.error('Request signature did not match expected signature.');
  return {
    body: { message: 'Request signature did not match expected signature.' },
    headers: { 'Content-Type': 'application/json' },
    status: 401,
  };
};
