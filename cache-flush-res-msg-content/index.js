const blocksBuilder = require('../lib/blocksBuilder');
const { errMsg, successMsg } = require('../lib/messages');

module.exports = async function msgContent(context, input) {
  const { err, payload, res } = input;

  if (res) {
    const {
      environment: { environment_input: { selected_option: { value: env } } },
      urls: { urls_input: { value: urls } },
    } = payload.view.state.values;

    return {
      blocks: blocksBuilder(successMsg(env, urls)),
      text: 'Cache flush succeeded',
    };
  }

  return {
    blocks: blocksBuilder(errMsg(err)),
    text: 'Cache flush failed',
  };
};
