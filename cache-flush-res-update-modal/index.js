const rp = require('request-promise-native');

module.exports = async function updateModalView(context, input) {
  const { view, viewId } = input;

  try {
    const res = await rp({
      body: {
        view,
        view_id: viewId,
      },
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN}`,
      },
      json: true,
      method: 'POST',
      url: 'https://slack.com/api/views.update',
    });
    if (!res.ok) {
      context.log.error('Error processing views.update');
      context.log.error(res);
    }
  } catch (err) {
    context.log.error('Error occurred sending views.update');
    context.log.error(err);
  }
};
