const df = require('durable-functions');
const processingView = require('./views/processing.json');

module.exports = async function startOrchestration(context, req) {
  const client = df.getClient(context);
  const instanceId = await client.startNew('SlackAppOrchestrator', undefined, req.body);
  context.log(`***********************Orchestration started with ID: ${instanceId}.`);

  return {
    body: {
      response_action: 'update',
      view: processingView,
    },
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  };
};
