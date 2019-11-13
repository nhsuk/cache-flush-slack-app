/* eslint-disable camelcase */
const modal = require('../views/modal-wrapper.json');

const notAllowedBlocks = require('../lib/notAllowedBlocks');

module.exports = async function verifyUser(context, payload) {
  const {
    team: { id: team_id, domain: team_domain }, user: { id: user_id, username: user_name },
  } = payload;
  context.log.warn(`user_name '${user_name}' with user_id '${user_id}' in team_domain '${team_domain}' with team_id '${team_id}' is not on the allowed users list.`);
  modal.blocks = notAllowedBlocks(user_id, user_name);
  return modal;
};
