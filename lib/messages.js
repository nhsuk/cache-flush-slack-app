function notAllowedMsg(id, name) {
  return `:warning: You do not have access to this feature :warning:\n\nIf you think you should, please submit the following as a message in the #operations channel:\n\`@sdsupport @infra Please add me to the list of allowed users for the <@cache-flush> app. My name is '${name}' and my member ID is '${id}'\``;
}

function processingMsg() {
  return ':information_source: Your request is being processed :information_source:\n\nIt will take several seconds to complete. Once complete, the status will be updated here and a direct message will be sent.\nThis view can be closed without affecting the request.';
}

function unauthorizedMsg() {
  return ':warning: The request can not be verified :warning:\n\nNo further processing will take place.\nContact the app developer if you believe this is an error.';
}

function updateFailedMsg() {
  return ':warning: The view was closed before the request was completed :warning:\n\nIf this was intentional you can ignore this message, otherwise please keep the view open in order to continue with the request.';
}

module.exports = {
  notAllowedMsg,
  processingMsg,
  unauthorizedMsg,
  updateFailedMsg,
};
