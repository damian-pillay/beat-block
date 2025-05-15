const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");
const fs = require("fs");
const path = require("path");

// Azurite default account info
const account = "devstoreaccount1";
const accountKey =
  "Eby8vdM02xNozJeWz0uG2fFtqS/fA1sJbGZ1Q2z2VGHkAZd0pYxkAzj6Cc==";
const containerName = "beat-block-storage";
const blobName = "sample.wav";
const downloadFilePath = path.join(__dirname, "downloaded_sample.wav");

// Setup credentials and blob service client for Azurite
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `http://127.0.0.1:10000/${account}`,
  sharedKeyCredential
);

async function main() {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Get blob properties to find out size
  const properties = await blockBlobClient.getProperties();
  const blobSize = properties.contentLength;

  const chunkSize = 4 * 1024 * 1024; // 4MB per chunk
  const fileHandle = fs.openSync(downloadFilePath, "w");

  try {
    for (let offset = 0; offset < blobSize; offset += chunkSize) {
      const count = Math.min(chunkSize, blobSize - offset);
      console.log(`Downloading bytes ${offset} to ${offset + count - 1}`);

      // Download chunk with range
      const downloadResponse = await blockBlobClient.download(offset, count);
      const chunkBuffer = await streamToBuffer(
        downloadResponse.readableStreamBody
      );

      // Write chunk to file at correct position
      fs.writeSync(fileHandle, chunkBuffer, 0, chunkBuffer.length, offset);
    }
    console.log(`Download complete, saved to '${downloadFilePath}'`);
  } finally {
    fs.closeSync(fileHandle);
  }
}

// Helper function to convert stream to buffer
async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data);
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
