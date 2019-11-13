const df = require('durable-functions');
const qs = require('querystring');

module.exports = df.orchestrator(function* slashStartOrchestrator(context) {
  const { req, res } = context.df.getInput();
  const reqBody = qs.parse(req.body);

  try {
    if (res.ok) {
      let view;
      const { view: { id: viewId } } = res;
      if (yield !context.df.callActivity('verify-req', req)) {
        const { blocks, text } = yield context.df.callActivity('verify-req-failed');
        yield context.df.callActivity('send-msg', { blocks, channel: reqBody.user_id, text });
        view = yield context.df.callActivity('verify-req-failed-view');
        yield context.df.callActivity('update-view', { view, viewId });
      } else if (yield !context.df.callActivity('verify-user', reqBody.user_id)) {
        const { blocks, text } = yield context.df.callActivity('verify-user-failed', req.body);
        yield context.df.callActivity('send-msg', { blocks, channel: reqBody.user_id, text });
        const { user_id: id, user_name: name } = reqBody;
        view = yield context.df.callActivity('verify-user-failed-view', { id, name });
        yield context.df.callActivity('update-view', { view, viewId });
      } else {
        view = yield context.df.callActivity('verified-req-view', reqBody.text);
        yield context.df.callActivity('update-view', { view, viewId });
      }
    } else {
      yield context.df.callActivity('send-msg', { channel: reqBody.user_id, text: `There has been an error opening the initial view:\n\`${JSON.stringify(res)}\`\nPlease contact the app developer.` });
    }
  } catch (err) {
    yield context.df.callActivity('send-msg', { channel: reqBody.user_id, text: `There has been an error processing the request:\n\`\`\`${err}\`\`\`\nPlease contact the app developer.` });
  }
});
