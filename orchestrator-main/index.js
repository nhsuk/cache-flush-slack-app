/* eslint-disable camelcase */
const df = require('durable-functions');
const qs = require('querystring');

const unauthorizedBlocks = require('../lib/unauthorizedBlocks');
const notAllowedBlocks = require('../lib/notAllowedBlocks');
const modal = require('../views/modal-wrapper.json');

module.exports = df.orchestrator(function* orchestratorMain(context) {
  const req = context.df.getInput();
  const payload = JSON.parse(qs.unescape(qs.parse(req.body).payload));

  if (yield !context.df.callActivity('verify-req', req)) {
    context.log.error('Request signature did not match expected signature.');
    modal.blocks = unauthorizedBlocks();
    yield context.df.callActivity('update-view', { view: modal, viewId: payload.view.id });
  } else if (yield !context.df.callActivity('verify-user', payload.user.id)) {
    const {
      team: { id: team_id, domain: team_domain }, user: { id: user_id, username: user_name },
    } = payload;
    context.log.warn(`user_name '${user_name}' with user_id '${user_id}' in team_domain '${team_domain}' with team_id '${team_id}' is not on the allowed users list.`);
    modal.blocks = notAllowedBlocks(user_id, user_name);
    yield context.df.callActivity('update-view', { view: modal, viewId: payload.view.id });
  } else {
    yield context.df.callActivity('cache-flush-req-logger', payload);
    const { err, res } = yield context.df.callActivity('cache-flush-req', payload);
    const view = yield context.df.callActivity('cache-flush-res-build-modal-view', { err, payload, res });
    const { blocks, text } = yield context.df.callActivity('cache-flush-res-build-msg', { err, payload, res });

    const parallelTasks = [];
    parallelTasks.push(context.df.callActivity('update-view', { view, viewId: payload.view.id }));
    parallelTasks.push(context.df.callActivity('send-dm', { blocks, channel: payload.user.id, text }));
    yield context.df.Task.all(parallelTasks);
  }
});
