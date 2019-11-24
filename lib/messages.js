function checkingMsg() {
  return ':information_source: Please do not close this window :information_source:\n\nChecking everything is in order before proceeding.';
}

function errMsg(err) {
  return `The request to cache flush has not been executed :disappointed:. The details are:\n*Status code:* \`${err.statusCode}\`\n*Error:*\n\`\`\`${JSON.stringify(err.error, null, '\t')}\`\`\`\nIf the message indicates the problem can be resolved by changing the request please do so and try again.`;
}

function notAllowedMsg(id, name) {
  return `:warning: You do not have access to this feature :warning:\n\nIf you think you should, please submit the following as a message in the #operations channel:\n\`@sdsupport @infra Please add me to the list of allowed users for the <@cache-flush> app. My name is '${name}' and my member ID is '${id}'\``;
}

function processingMsg() {
  return ':information_source: Your request is being processed :information_source:\n\nIt will take several seconds to complete. Once complete, the status will be updated here and a direct message will be sent.\nThis view can be closed without affecting the request.';
}

function successMsg(env, urls) {
  return `The request to cache flush has been successful :smiley:. The refresh will complete within approximately five seconds.\nThe details of the request are:\n*Environment:* \`${env}\`\n*URLs:*\n${urls}`;
}

function unauthorizedMsg() {
  return ':warning: The request can not be verified :warning:\n\nNo further processing will take place.\nContact the app developer if you believe this is an error.';
}

function updateFailedMsg() {
  return ':warning: The view was closed before the request was completed :warning:\n\nIf this was intentional you can ignore this message, otherwise please keep the view open in order to continue with the request.';
}

module.exports = {
  checkingMsg,
  errMsg,
  notAllowedMsg,
  processingMsg,
  successMsg,
  unauthorizedMsg,
  updateFailedMsg,
};
