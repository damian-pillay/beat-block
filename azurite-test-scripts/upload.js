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

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const fileSize = fs.statSync(localFilePath).size;
  const blockSize = 4 * 1024 * 1024; // 4MB block size
  const blockCount = Math.ceil(fileSize / blockSize);

  const blockIds = [];

  const fileHandle = fs.openSync(localFilePath, "r");

  try {
    for (let i = 0; i < blockCount; i++) {
      const start = i * blockSize;
      const end = Math.min(start + blockSize, fileSize);
      const chunkSize = end - start;
      const buffer = Buffer.alloc(chunkSize);

      fs.readSync(fileHandle, buffer, 0, chunkSize, start);

      // Azure requires block IDs to be base64-encoded strings
      const blockId = Buffer.from(String(i).padStart(6, "0")).toString(
        "base64"
      );
      blockIds.push(blockId);

      console.log(
        `Uploading block ${i + 1} of ${blockCount} (size: ${chunkSize} bytes)`
      );
      await blockBlobClient.stageBlock(blockId, buffer, chunkSize);
    }

    // Commit the block list to assemble the blob
    await blockBlobClient.commitBlockList(blockIds);
    console.log(`Upload complete for blob '${blobName}'`);
  } finally {
    fs.closeSync(fileHandle);
  }
}

main().catch((err) => {
  console.error("Error running script:", err.message);
});
