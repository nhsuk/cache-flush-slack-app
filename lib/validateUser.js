const { BlobClient } = require('@azure/storage-blob');
const streamToString = require('./streamToString');
const { blobName, containerName } = require('../lib/constants').allowedUsers;

async function validateUser(userId) {
  const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const blobClient = new BlobClient(conn, containerName, blobName);
  const downloadBlockBlobResponse = await blobClient.download();
  const users = await streamToString(downloadBlockBlobResponse.readableStreamBody);

  return JSON.parse(users).map((user) => user.user_id).includes(userId);
}

module.exports = validateUser;
