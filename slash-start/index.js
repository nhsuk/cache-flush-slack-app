const qs = require('querystring');
const rp = require('request-promise-native');

const isRequestValid = require('../lib/verifyRequest');
const isUserValid = require('../lib/validateUser');
const { jsonContentTypeHeader } = require('../lib/constants');
const notAllowedBlocks = require('../lib/notAllowedBlocks');
const unauthorizedBlocks = require('../lib/unauthorizedBlocks');

const openView = require('./views/open.json');

module.exports = async function slashStart(context, req) {
  if (isRequestValid(req)) {
    const {
      // eslint-disable-next-line camelcase
      team_domain, team_id, text, user_id, user_name,
    } = qs.parse(req.body);

    openView.blocks[1].element.initial_value = text;

    if (await isUserValid(user_id)) {
      try {
        const res = await rp({
          body: {
            trigger_id: qs.decode(req.body).trigger_id,
            view: openView,
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
          context.log.error('Error processing views.open');
          context.log.error(res);
        }
      } catch (err) {
        context.log.error('Error occurred sending views.open');
        context.log.error(err);
      }
      return null;
    }
    // eslint-disable-next-line camelcase
    context.log.warn(`user_name '${user_name}' with user_id '${user_id}' in team_domain '${team_domain}' with team_id '${team_id}' is not on the allowed users list.`);
    return {
      body: {
        blocks: notAllowedBlocks(),
        text: 'User not allowed',
      },
      headers: { 'Content-Type': jsonContentTypeHeader },
      status: 200,
    };
  }
  context.log.error('Request signature did not match expected signature');
  return {
    body: {
      blocks: unauthorizedBlocks(),
      text: 'Invalid request signature',
    },
    headers: { 'Content-Type': jsonContentTypeHeader },
    status: 200,
  };
};
