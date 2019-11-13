const df = require('durable-functions');

const { jsonContentTypeHeader } = require('../lib/constants');
const processingBlocks = require('../lib/processingBlocks');

const modal = require('../views/modal-wrapper.json');

module.exports = async function cacheFlushOrchestrationClient(context, req) {
  const client = df.getClient(context);
  const instanceId = await client.startNew('cache-flush-orchestrator', undefined, req);
  context.log(`cache-flush orchestration started with ID: ${instanceId}.`);

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
