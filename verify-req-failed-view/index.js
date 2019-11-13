const unauthorizedBlocks = require('../lib/unauthorizedBlocks');
const modal = require('../views/modal-wrapper.json');

module.exports = async function buildMsg(context) {
  context.log.error('Request signature did not match expected signature.');
  modal.blocks = unauthorizedBlocks();
  return modal;
};
