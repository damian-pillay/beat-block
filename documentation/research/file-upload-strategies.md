# File Upload Strategies

This section outlines common methods and best practices for handling file uploads in web applications. It covers techniques for sending files from the frontend to the backend, storing them efficiently, and managing scalability and performance across different use cases.

## Notes

### Standard `multipart/form-data` Upload

**Description**  
Files are uploaded from the frontend using `FormData` and sent to the backend via HTTP POST. The backend handles file parsing (e.g., with `multer`) and uploads it to Azure Blob Storage.

**Pros**

- Simple and widely supported.
- Good for small to moderate file sizes (up to 50–100MB).
- Works with traditional HTML forms and JavaScript.

**Cons**

- Entire file may be buffered in memory or temp storage.
- Not ideal for large files due to memory constraints.

**Best For**

- Basic file upload forms.
- MVPs and admin panels handling small files.

**Scalability**: Moderate  
**Deployment Readiness**: Good

---

### Chunked Uploads

**Description**  
Frontend splits files into smaller parts (chunks) and uploads each one individually. Azure Blob Storage’s Block Blob API allows these chunks to be assembled into a single file efficiently.

**Pros**

- Ideal for streaming: chunks can be accessed independently, allowing music players to start playback before the entire file is downloaded.
- More efficient for large files, as only necessary parts are transferred at any given time.
- Supports parallel uploads to speed up the transfer process.

**Cons**

- More complex to implement compared to single-shot uploads.
- Requires tracking chunk order and upload coordination.

**Best For**

- Media-heavy applications where streaming performance matters.
- Use cases where responsiveness and smooth playback are important.

**Scalability**: Very High  
**Deployment Readiness**: Intermediate to Advanced

---

### Direct Upload to Blob via SAS (Pre-signed URLs)

**Description**  
Frontend requests a secure, time-limited SAS (Shared Access Signature) URL from the backend and uploads directly to blob storage.

**Pros**

- Offloads all file handling from your backend.
- Extremely scalable.
- Backend doesn’t handle the file content.

**Cons**

- Requires secure SAS token generation.
- More difficult to monitor or validate uploads.

**Best For**

- Production-grade apps expecting high volume.
- Scenarios where performance and cost-efficiency matter.

**Scalability**: Very High  
**Deployment Readiness**: Excellent

---

## Links

- [Python sample code to upload the blob to Azurite by using the SAS token](https://learn.microsoft.com/en-us/samples/azure-samples/azure-cxp-developer-support/python-sample-code-to-upload-the-blob-to-azurite-by-using-the-sas-token/)
- [Video: Shared access signature in Azure storage account explained](https://www.youtube.com/watch?v=0HBDjEigg6Y)

## Thoughts

After extensive research, it was decided that the optimal solution for my application would enable seamless uploading, downloading, and streaming of files. Given that my files tend to be fairly large, any method that requires the entire file to be fully rendered or loaded before transfer would be inefficient. Therefore, a strategy utilizing chunked data transfer was necessary to ensure performance and scalability.

Two main strategies were considered:

- Handling chunking of data on the backend for both upload and download
- Using SAS (Shared Access Signature) tokens to provide controlled, direct access from the frontend to Azure Blob Storage, which inherently supports chunking through HTTP range requests.

Each approach comes with pros and cons. Managing chunking in the backend offers greater deployment flexibility and reduces dependency on Azure-specific features. However, this approach puts significant processing and bandwidth demands on the backend, increasing complexity and resource usage. Conversely, the SAS token approach leverages Azure Blob Storage’s native support for chunked data transfer and streaming, minimizing backend workload and simplifying code. This makes it highly efficient and scalable but ties the application more closely to Azure, potentially complicating future migration to other cloud providers.

Given my project’s time constraints and specific use case, the SAS token approach appears to be the most practical and efficient choice to implement.

**Why I like the SAS token approach:**

- It takes a lot of the heavy lifting off my backend since Azure Blob Storage handles the actual file transfers. My server’s job is mainly to hand out secure tokens.
- It easily supports many users streaming or downloading at the same time without bogging down the backend.
- I get fine-grained control over who can access the files and for how long, which makes me feel confident about security.
- Streaming feels smooth because Blob Storage supports loading only the parts of the file that are needed, so users don’t have to wait for the entire file to download before they can start listening.
- Overall, it keeps my code simpler and easier to maintain because I don’t have to build complex chunking or streaming logic myself.

This makes it a practical, efficient, and secure choice that fits well with what I want to achieve.
