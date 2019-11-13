const { BlobClient } = require('@azure/storage-blob');
const streamToString = require('./streamToString');
const { blobName, containerName } = require('../lib/constants').allowedUsers;

async function verifyUser(userId) {
  const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const blobClient = new BlobClient(conn, containerName, blobName);
  const downloadBlockBlobResponse = await blobClient.download();
  const users = await streamToString(downloadBlockBlobResponse.readableStreamBody);

  // First column is user_id/member_id
  return users.split('\n').map((user) => user.split(',')[0]).includes(userId);
}

module.exports = verifyUser;
