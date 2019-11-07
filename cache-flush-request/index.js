const rp = require('request-promise-native');

const errorView = require('./views/error.json');
const successView = require('./views/success.json');

module.exports = async function cacheFlush(context, input) {
  const {
    environment: { environment_input: { selected_option: { value: envValue } } },
    urls: { urls_input: { value: urlsValue } },
  } = input.view.state.values;

  const objects = urlsValue.split('\n');
  const cacheFlushUrl = process.env.CACHE_FLUSH_FUNCTION_APP_FULL_URL_WITH_PATH_AND_CODE;
  let view;
  try {
    const cacheFlushRes = await rp({
      body: {
        environment: envValue,
        objects,
      },
      json: true,
      method: 'POST',
      resolveWithFullResponse: true,
      url: cacheFlushUrl,
    });
    context.log('*******************cacheFlushRes');
    context.log(cacheFlushRes);
    // TODO: Create a 'markdown block creator' helper and append them to blocks
    successView.blocks[2].text.text = `*Environment:* ${envValue}`;
    successView.blocks[3].text.text = `*URLs:*\n${urlsValue}`;
    view = successView;
  } catch (err) {
    // TODO: Create a 'markdown block creator' helper and append them to blocks
    errorView.blocks[3].text.text = `*Status Code:* ${err.statusCode}`;
    errorView.blocks[4].text.text = `*Error:*\n\`\`\`${JSON.stringify(err.error, null, '\t')}\`\`\``;
    view = errorView;
    context.log.error('**************BUSTED');
    context.log.error(err);
  }
  return view;
};
