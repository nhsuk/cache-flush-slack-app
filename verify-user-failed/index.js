/* eslint-disable camelcase */
const qs = require('querystring');
const verifyUserFailedMsg = require('../lib/verifyUserFailedMsg');

module.exports = async function verifyRequestFailed(context, body) {
  const {
    team_domain, team_id, user_id, user_name,
  } = qs.parse(body);
  context.log.warn(`user_name '${user_name}' with user_id '${user_id}' in team_domain '${team_domain}' with team_id '${team_id}' is not on the allowed users list.`);
  context.log.error('Request signature did not match expected signature');
  return verifyUserFailedMsg();
};
