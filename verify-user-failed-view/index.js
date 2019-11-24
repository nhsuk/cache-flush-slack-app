/* eslint-disable camelcase */
const modal = require('../views/modal-wrapper.json');

const blocksBuilder = require('../lib/blocksBuilder');
const { unauthorizedMsg } = require('../lib/messages');

module.exports = async function verifyUser(context, user) {
  context.log.warn(`User '${user.name}' with id '${user.id}' is not on the allowed users list.`);
  modal.blocks = blocksBuilder(unauthorizedMsg(user.id, user.name));
  return modal;
};
