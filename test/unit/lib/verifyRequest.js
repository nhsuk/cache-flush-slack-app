const chai = require('chai');
const crypto = require('crypto');
const verifyRequest = require('../../../lib/verifyRequest');

const { expect } = chai;

describe('verifyRequest', () => {
  describe('successful verification', () => {
    const secret = 'secret';
    before('setup env var', () => {
      process.env.SLACK_SIGNING_SECRET = secret;
    });

    after('reset env var', () => {
      process.env.SLACK_SIGNING_SECRET = null;
    });

    it('should return true when request contains a signature that matches generated signature', () => {
      const body = 'some-things-in-the-body-does-not-matter-what';
      const timestamp = Date.now();
      const versionNumber = 'v0';
      const basestring = `${versionNumber}:${timestamp}:${body}`;
      const hash = crypto.createHmac('sha256', secret).update(basestring).digest('hex');
      const signature = `${versionNumber}=${hash}`;
      const req = {
        body,
        headers: {
          'x-slack-request-timestamp': timestamp,
          'x-slack-signature': signature,
        },
      };

      const result = verifyRequest(req);

      expect(result).to.be.true;
    });
  });

  describe('unsuccessful verification', () => {
    it('should return false when request contains a signature that does not match generated signature', () => {
      const req = {
        body: 'some-things-in-the-body-does-not-matter-what',
        headers: {
          'x-slack-request-timestamp': Date.now(),
          'x-slack-signature': 'not-a-correct-signature',
        },
      };

      const result = verifyRequest(req);

      expect(result).to.be.false;
    });

    it('should return false when request does not contain a signature', () => {
      const req = {
        headers: { },
      };

      const result = verifyRequest(req);

      expect(result).to.be.false;
    });
  });
});
