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
const containerName = "test-container";
const blobName = "sample.wav"; // The blob name to download
const downloadFilePath = path.join(__dirname, "downloaded_sample.wav"); // Where to save the file locally

// Setup credentials and blob service client for Azurite
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `http://127.0.0.1:10000/${account}`,
  sharedKeyCredential
);

async function main() {
  // Get container client
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Get blob client for the WAV file
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Download the WAV file
  const downloadResponse = await blockBlobClient.download();
  const downloadedContent = await streamToBuffer(
    downloadResponse.readableStreamBody
  );

  // Write the downloaded content to a local file
  fs.writeFileSync(downloadFilePath, downloadedContent);
  console.log(
    `Downloaded '${blobName}' from container '${containerName}' to '${downloadFilePath}'`
  );
}

// Convert a Node.js readable stream to a Buffer
async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

main().catch((err) => {
  console.error("Error running script:", err.message);
});
