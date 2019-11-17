const blocksBuilder = require('../lib/blocksBuilder');
const { unauthorizedMsg } = require('../lib/messages');

const modal = require('../views/modal-wrapper.json');

module.exports = async function buildMsg(context) {
  context.log.error('Request signature did not match expected signature.');
  modal.blocks = blocksBuilder(unauthorizedMsg);
  return modal;
};
