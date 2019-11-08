const df = require('durable-functions');
const qs = require('querystring');

module.exports = df.orchestrator(function* mainOrchestrator(context) {
  const input = context.df.getInput();
  const payload = JSON.parse(qs.unescape(qs.parse(input).payload));
  // Useful to see the payload contents
  context.log(payload);

  const { err, res } = yield context.df.callActivity('cache-flush-req', payload);
  const view = yield context.df.callActivity('cache-flush-res-build-modal-view', { err, payload, res });
  const { blocks, text } = yield context.df.callActivity('cache-flush-res-build-msg', { err, payload, res });

  const parallelTasks = [];
  parallelTasks.push(context.df.callActivity('cache-flush-res-update-modal', { view, viewId: payload.view.id }));
  parallelTasks.push(context.df.callActivity('cache-flush-res-dm-user', { blocks, channel: payload.user.id, text }));
  yield context.df.Task.all(parallelTasks);
});
