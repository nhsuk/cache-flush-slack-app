/* eslint-disable camelcase */
const modal = require('../views/modal-wrapper.json');

const notAllowedBlocks = require('../lib/notAllowedBlocks');

module.exports = async function verifyUser(context, user) {
  context.log.warn(`User '${user.name}' with id '${user.id}' is not on the allowed users list.`);
  modal.blocks = notAllowedBlocks(user.id, user.name);
  return modal;
};
