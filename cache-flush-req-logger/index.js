module.exports = async function logCacheFlushRequest(context, input) {
  context.log('Request made:');
  context.log(input);
};
