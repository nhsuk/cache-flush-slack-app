const df = require('durable-functions');

const { jsonContentTypeHeader } = require('../lib/constants');
const processingBlocks = require('../lib/processingBlocks');

const modal = require('../views/modal-wrapper.json');

module.exports = async function mainOrchestrationClient(context, req) {
  const client = df.getClient(context);
  const instanceId = await client.startNew('orchestrator-main', undefined, req);
  context.log(`Orchestration started with ID: ${instanceId}.`);

  modal.blocks = processingBlocks();

  return {
    body: {
      response_action: 'update',
      view: modal,
    },
    headers: { 'Content-Type': jsonContentTypeHeader },
    status: 200,
  };
};
