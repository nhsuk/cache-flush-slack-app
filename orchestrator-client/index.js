const df = require('durable-functions');
const isRequestValid = require('../lib/verifyRequest');
const processingView = require('./views/processing.json');
const unauthorizedView = require('./views/unauthorized.json');

module.exports = async function orchestrationClient(context, req) {
  let view;
  if (isRequestValid(req)) {
    const client = df.getClient(context);
    const instanceId = await client.startNew('orchestrator-main', undefined, req.body);
    context.log(`Orchestration started with ID: ${instanceId}.`);
    view = processingView;
  } else {
    context.log.error('Request signature did not match expected signature.');
    view = unauthorizedView;
  }

  return {
    body: {
      response_action: 'update',
      view,
    },
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  };
};
