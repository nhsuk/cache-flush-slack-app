const df = require('durable-functions');
const qs = require('querystring');
const rp = require('request-promise-native');

const { jsonContentTypeHeader } = require('../lib/constants');
const waitingBlocks = require('../lib/waitingBlocks');

const view = require('../views/modal-wrapper.json');

module.exports = async function slashStartClient(context, req) {
  // Need to return this ASAP, 3 seconds validatity on trigger_id
  view.blocks = waitingBlocks();
  const res = await rp({
    body: {
      trigger_id: qs.decode(req.body).trigger_id,
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

  const client = df.getClient(context);
  const instanceId = await client.startNew('slash-start-orchestrator', undefined, { req, res });
  context.log(`slash-start orchestration started with ID: ${instanceId}.`);

  return null;
};
