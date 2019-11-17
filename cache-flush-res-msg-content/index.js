const blocksBuilder = require('../lib/blocksBuilder');

module.exports = async function msgContent(context, input) {
  const { err, payload, res } = input;
  if (res) {
    const {
      environment: { environment_input: { selected_option: { value: envValue } } },
      urls: { urls_input: { value: urlsValue } },
    } = payload.view.state.values;

    const successMsg = `The request to cache flush has been successful :smiley:. The refresh will complete within approximately five seconds.\nThe details of the request are:\n*Environment:* \`${envValue}\`\n*URLs:*\n${urlsValue}`;

    return {
      blocks: blocksBuilder(successMsg),
      text: 'Cache flush succeeded',
    };
  }

  const errMsg = `The request to cache flush has not been executed :disappointed:. The details are:\n*Status code:* \`${err.statusCode}\`\n*Error:*\n\`\`\`${JSON.stringify(err.error, null, '\t')}\`\`\`\nIf the message indicates the problem can be resolved by changing the request please do so and try again.`;
  return {
    blocks: blocksBuilder(errMsg),
    text: 'Cache flush failed',
  };
};
