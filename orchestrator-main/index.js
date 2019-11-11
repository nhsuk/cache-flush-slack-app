const df = require('durable-functions');

module.exports = df.orchestrator(function* orchestratorMain(context) {
  const payload = context.df.getInput();
  const { err, res } = yield context.df.callActivity('cache-flush-req', payload);
  const view = yield context.df.callActivity('cache-flush-res-build-modal-view', { err, payload, res });
  const { blocks, text } = yield context.df.callActivity('cache-flush-res-build-msg', { err, payload, res });

  const parallelTasks = [];
  parallelTasks.push(context.df.callActivity('cache-flush-res-update-modal', { view, viewId: payload.view.id }));
  parallelTasks.push(context.df.callActivity('cache-flush-res-dm-user', { blocks, channel: payload.user.id, text }));
  yield context.df.Task.all(parallelTasks);
});
