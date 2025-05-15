const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");
const fs = require("fs");
const path = require("path");

// Azurite default account info
const account = "devstoreaccount1";
const accountKey =
  "Eby8vdM02xNozJeWz0uG2fFtqS/fA1sJbGZ1Q2z2VGHkAZd0pYxkAzj6Cc=="; // Use full dev key
const containerName = "beat-block-storage";
const blobName = "sample.wav"; // The name for the blob in the container
const localFilePath = path.join(__dirname, "sample.wav"); // Local path to your WAV file

// Setup credentials and blob service client for Azurite
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `http://127.0.0.1:10000/${account}`,
  sharedKeyCredential
);

async function main() {
  // Get container client
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Create container if it doesn't exist
  try {
    await containerClient.create();
    console.log(`Container "${containerName}" created`);
  } catch (err) {
    if (err.statusCode === 409) {
      console.log(`Container "${containerName}" already exists`);
    } else {
      throw err;
    }
  }

  // Upload the WAV file
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadFile(localFilePath);
  console.log(`Uploaded '${blobName}' to container '${containerName}'`);
}

main().catch((err) => {
  console.error("Error running script:", err.message);
});
