const df = require('durable-functions');
const qs = require('querystring');

module.exports = df.orchestrator(function* mainOrchestrator(context) {
  // context.log('******************ORCHESTRATION START');
  const input = context.df.getInput();
  const payload = JSON.parse(qs.unescape(qs.parse(input).payload));

  const responseView = yield context.df.callActivity('cache-flush-request', payload);
  yield context.df.callActivity('cache-flush-response-actions', { view: responseView, viewId: payload.view.id });
  // TODO: Send DM with the info
});
