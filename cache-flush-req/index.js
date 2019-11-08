const rp = require('request-promise-native');

module.exports = async function cacheFlush(context, input) {
  const {
    environment: { environment_input: { selected_option: { value: envValue } } },
    urls: { urls_input: { value: urlsValue } },
  } = input.view.state.values;

  const objects = urlsValue.split('\n');
  const cacheFlushUrl = process.env.CACHE_FLUSH_FUNCTION_APP_FULL_URL_WITH_PATH_AND_CODE;
  let res;
  let err;
  try {
    res = await rp({
      body: {
        environment: envValue,
        objects,
      },
      json: true,
      method: 'POST',
      resolveWithFullResponse: true,
      url: cacheFlushUrl,
    });
    // TODO: Does this need logging?
    context.log('*******************cacheFlushRes');
    context.log(res);
  } catch (error) {
    err = error;
    context.log.error('Error occurred updating cache.');
    context.log.error(err);
  }

  return {
    err,
    res,
  };
};
