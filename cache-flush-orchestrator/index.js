const df = require('durable-functions');
const qs = require('querystring');

const modal = require('../views/modal-wrapper.json');

module.exports = df.orchestrator(function* cacheFlushOrchestrator(context) {
  const req = context.df.getInput();
  const payload = JSON.parse(qs.unescape(qs.parse(req.body).payload));

  let view;
  if (yield !context.df.callActivity('verify-req', req)) {
    view = yield context.df.callActivity('verify-req-failed-view');
    yield context.df.callActivity('update-view', { view, viewId: payload.view.id });
  } else if (yield !context.df.callActivity('verify-user', payload.user.id)) {
    view = yield context.df.callActivity('verify-user-failed-view', payload);
    yield context.df.callActivity('update-view', { view, viewId: payload.view.id });
  } else {
    yield context.df.callActivity('cache-flush-req-logger', payload);
    const { err, res } = yield context.df.callActivity('cache-flush-req', payload);
    const { blocks, text } = yield context.df.callActivity('cache-flush-res-msg-content', { err, payload, res });
    modal.blocks = blocks;

    const parallelTasks = [];
    parallelTasks.push(context.df.callActivity('update-view', { view: modal, viewId: payload.view.id }));
    parallelTasks.push(context.df.callActivity('send-msg', { blocks, channel: payload.user.id, text }));
    yield context.df.Task.all(parallelTasks);
  }
});
