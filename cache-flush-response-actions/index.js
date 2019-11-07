const rp = require('request-promise-native');

module.exports = async function cacheFlush(context, input) {
  const { view, viewId } = input;

  try {
    const viewUpdateRes = await rp({
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
    context.log('*******************VIEW WAS SUCCESSFULLY UPDATED');
    context.log(viewUpdateRes);
  } catch (err) {
    context.log.error('*******************ERROR OCCURRED DURING UPDATING VIEW');
    context.log.error(err);
  }
};
