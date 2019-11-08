const sectionBlock = require('../lib/sectionBlockBuilder');

function successBlocks(payload) {
  const {
    environment: { environment_input: { selected_option: { value: envValue } } },
    urls: { urls_input: { value: urlsValue } },
  } = payload.view.state.values;

  return [
    sectionBlock('The request to cache flush has been successful :smiley:. The refresh will complete within approximatelty five seconds.\nThe details of the request are:'),
    sectionBlock(`*Environment:* \`${envValue}\``),
    sectionBlock(`*URLs:*\n${urlsValue}`),
  ];
}

module.exports = successBlocks;
