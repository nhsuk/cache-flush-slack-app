const df = require('durable-functions');
const processingView = require('./views/processing.json');

module.exports = async function orchestrationClient(context, req) {
  const client = df.getClient(context);
  // TODO: Verify request is from Slack
  context.log.error(req);
  const instanceId = await client.startNew('orchestrator-main', undefined, req.body);
  context.log(`Orchestration started with ID: ${instanceId}.`);

  return {
    body: {
      response_action: 'update',
      view: processingView,
    },
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  };
};
