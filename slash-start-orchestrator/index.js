const df = require('durable-functions');
const qs = require('querystring');

module.exports = df.orchestrator(function* slashStartOrchestrator(context) {
  const req = context.df.getInput();
  context.log.error(req);
  const payload = (qs.parse(req.body));
  context.log.warn(payload);

  try {
    if (yield !context.df.callActivity('verify-req', req)) {
      const { blocks, text } = yield context.df.callActivity('verify-req-failed');
      yield context.df.callActivity('send-msg', { blocks, channel: payload.user_id, text });
    } else if (yield !context.df.callActivity('verify-user', payload.user_id)) {
      const { blocks, text } = yield context.df.callActivity('verify-user-failed', req.body);
      yield context.df.callActivity('send-msg', { blocks, channel: payload.user_id, text });
    } else {
      yield context.df.callActivity('open-view', payload);
    }
  } catch (err) {
    yield context.df.callActivity('send-msg', { channel: payload.user_id, text: `There has been an error processing the request:\n\`\`\`${err}\`\`\`\nPlease contact the app developer.` });
  }
});
