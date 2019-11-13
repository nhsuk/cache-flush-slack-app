const df = require('durable-functions');

const { jsonContentTypeHeader } = require('../lib/constants');

module.exports = async function slashStartClient(context, req) {
  const client = df.getClient(context);
  const instanceId = await client.startNew('slash-start-orchestrator', undefined, req);
  context.log(`slash-start orchestration started with ID: ${instanceId}.`);

  return {
    body: {
      text: 'Request recieved. The interface will open shortly.',
    },
    headers: { 'Content-Type': jsonContentTypeHeader },
    status: 200,
  };
};
