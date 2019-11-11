/* eslint-disable camelcase */
const df = require('durable-functions');
const qs = require('querystring');

const isRequestValid = require('../lib/verifyRequest');
const isUserValid = require('../lib/validateUser');
const { jsonContentTypeHeader } = require('../lib/constants');
const notAllowedBlocks = require('../lib/notAllowedBlocks');
const processingBlocks = require('../lib/processingBlocks');
const unauthorizedBlocks = require('../lib/unauthorizedBlocks');

const modal = require('../views/modal-wrapper.json');

module.exports = async function orchestrationClient(context, req) {
  if (isRequestValid(req)) {
    const payload = JSON.parse(qs.unescape(qs.parse(req.body).payload));
    const {
      team: { id: team_id, domain: team_domain }, user: { id: user_id, username: user_name },
    } = payload;

    if (isUserValid(payload.user.id)) {
      const client = df.getClient(context);
      const instanceId = await client.startNew('orchestrator-main', undefined, payload);
      context.log(`Orchestration started with ID: ${instanceId}.`);
      modal.blocks = processingBlocks();
    } else {
      context.log.warn(`user_name '${user_name}' with user_id '${user_id}' in team_domain '${team_domain}' with team_id '${team_id}' is not on the allowed users list.`);
      modal.blocks = notAllowedBlocks();
    }
  } else {
    context.log.error('Request signature did not match expected signature.');
    modal.blocks = unauthorizedBlocks();
  }

  return {
    body: {
      response_action: 'update',
      view: modal,
    },
    headers: { 'Content-Type': jsonContentTypeHeader },
    status: 200,
  };
};
