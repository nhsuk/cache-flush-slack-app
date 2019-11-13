const crypto = require('crypto');

// Verify request originates from Slack
// https://api.slack.com/docs/verifying-requests-from-slack
function verifyRequest(req) {
  const versionNumber = 'v0';
  const { body, headers } = req;
  const timestamp = headers['x-slack-request-timestamp'];
  const signature = headers['x-slack-signature'];
  const basestring = `${versionNumber}:${timestamp}:${body}`;
  const secret = process.env.SLACK_SIGNING_SECRET;

  const hash = crypto.createHmac('sha256', secret).update(basestring).digest('hex');
  const generatedSignature = `${versionNumber}=${hash}`;

  return signature === generatedSignature;
}

module.exports = verifyRequest;
