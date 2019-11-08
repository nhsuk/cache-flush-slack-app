const errorBlocks = require('../lib/errorBlocks');
const successBlocks = require('../lib/successBlocks');

const modal = require('../views/modal-template.json');

module.exports = async function buildModalView(context, input) {
  const { err, payload, res } = input;

  modal.blocks = res ? successBlocks(payload) : errorBlocks(err);
  return modal;
};
