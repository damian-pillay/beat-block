# File Storage Strategies

An overview of ways to store large files in a full-stack app using MSSQL, comparing local and cloud strategies for MVPs and deployment.

## Notes

### Storage by Converting to Binary and Storing Directly in the Database

**Description**  
Files are converted to binary (`VARBINARY(MAX)`) and stored directly in MSSQL.

**Pros**

- Simple to implement.
- Data integrity and backup handled by MSSQL.
- Easy for quick MVPs and local demos.

**Cons**

- Database grows quickly.
- Poor performance and scalability for large files.
- Difficult to maintain with heavy file I/O.

**Best For**

- MVPs and demos where file count/size is small and simplicity is key.

**Scalability**: Low  
**Deployment Readiness**: Limited

---

### Storing on the Local Disk

**Description**  
Files are saved in a folder on the backend server, and only file paths are stored in the database.

**Pros**

- Fast read/write during development.
- Minimal setup.
- Works well for local testing.

**Cons**

- Not scalable.
- Risk of file loss.
- Can’t easily deploy or replicate across environments.

**Best For**

- Local development and prototype phases.

**Scalability**: Low  
**Deployment Readiness**: Poor

---

### Storage on the Server Disk (Azure Blob)

**Description**  
Files are uploaded to Azure Blob Storage, and metadata or URLs are saved in the MSSQL database.

**Pros**

- Designed for massive file storage.
- Fast, scalable, and secure.
- Easy to integrate with Azure-based apps.

**Cons**

- Requires Azure setup and learning curve.
- Has a cost based on usage.

**Best For**

- MVPs that are preparing for production or public deployment.
- Applications handling many or large files.

**Scalability**: High  
**Deployment Readiness**: Excellent

---

### Storage Emulator (Azurite)

**Description**  
Azurite is a local emulator for Azure Blob Storage, allowing developers to test blob storage functionality without connecting to the actual Azure cloud.

**Pros**

- No internet connection or Azure subscription required.
- Fast local testing and development.
- Easy to set up using Docker or npm.
- Compatible with Azure SDKs and tools.

**Cons**

- Not suitable for production use.
- Lacks some advanced Azure features.
- Temporary storage — data is lost when the container is removed unless volumes are mounted.

**Best For**

- Local development and testing.
- Simulating Azure Blob Storage before deployment.
- Building MVPs before committing to Azure services.

**Scalability**: Low (dev use only)  
**Deployment Readiness**: Not for production

### Storage Using FILESTREAM (Local)

**Description**  
Uses SQL Server's FILESTREAM feature to store large binary files in the NTFS file system while still managing them through the database.

**Pros**

- Allows storage of large files (>2GB).
- Maintains database transactional consistency.
- Better performance than storing in `VARBINARY`.

**Cons**

- Requires enabling and configuring FILESTREAM.
- Adds complexity to local development.

**Best For**

- Local Windows setups with large files and SQL Server management needs.

**Scalability**: Medium  
**Deployment Readiness**: Moderate

---

### Storage Using FILESTREAM on an Azure VM

**Description**  
A SQL Server instance running on an Azure Virtual Machine uses FILESTREAM to store files in the VM's file system.

**Pros**

- Combines control of FILESTREAM with cloud deployment.
- Better performance and flexibility compared to direct `VARBINARY`.

**Cons**

- High setup and maintenance overhead.
- Azure VMs are costlier than PaaS solutions.
- Still less scalable than Azure Blob for massive file workloads.

**Best For**

- Legacy systems or where fine-tuned control over VM and SQL Server is required.

**Scalability**: Medium  
**Deployment Readiness**: Good (but complex)

## Links

- [StackOverflow: Store audio in SQL Server](https://stackoverflow.com/questions/2072485/store-audio-in-sql-server)
- [FILESTREAM (SQL Server) - Official Documentation](https://learn.microsoft.com/en-us/sql/relational-databases/blob/filestream-sql-server?view=sql-server-ver16)

## Thoughts

After researching large file storage options for full-stack applications, I've learned that storing large binary data directly in the database is discouraged due to performance issues and potential data integrity challenges. Although acceptable for an MVP, a more stable solution is preferred.

The commonly recommended approach is to store files on the server's disk and reference their paths in the database. This balances performance and integrity, though storage costs become a factor if deployed to a cloud platform like Azure. Azure Blob Storage offers various pricing tiers based on access speed and storage size, with extra costs for reads and writes. It’s scalable and ideal long-term but introduces complexity and cost overhead.

An interesting and optimized alternative is using MSSQL's FILESTREAM, which stores large binary data in the file system but links it with database records. This leverages database functionality while avoiding direct VARBINARY(MAX) storage performance issues. It’s also easy to test locally and doesn’t require additional services like mock blob storage.

Given that FILESTREAM is MSSQL-exclusive and well-integrated, it seems ideal for this MVP, especially when hosting on an Azure VM. It allows for straightforward demos without exceeding reasonable storage limits. While not cloud-native like Blob Storage, it demonstrates thoughtful consideration of trade-offs, scalability, and database strengths, which could impress during presentation.

Ultimately, both options are viable. FILESTREAM offers better integration and simplicity for local development and proof-of-concept, while Blob Storage is better suited for production-scale systems. Choosing FILESTREAM now keeps development light but doesn't prevent future migration to Blob or other scalable storage solutions.

**UPDATE: 15/05/2025**
After initially attempting to implement the FILESTREAM method for handling large files, I discovered that FILESTREAM support in MSSQL is limited to Windows-based environments. This limitation effectively rules out containerisation, significantly reducing the flexibility and optimisation potential of deployment. As a result, I pivoted to exploring Azure Blob Storage as a more versatile solution.

To test blob storage functionality in a local development environment, I needed a service that could emulate Azure Blob Storage. I came across Azurite, Microsoft’s open-source storage emulator, which proved to be much simpler to set up and use than I initially anticipated. Azurite works by mocking blob storage within a container that runs on the same Docker network as my application, allowing seamless communication between services.

I tested Azurite’s performance by uploading and downloading a 55MB .wav file using basic JavaScript scripts. The emulator handled the file transfers efficiently, with no noticeable performance issues, demonstrating that it’s a solid local alternative for prototyping Azure Blob Storage integrations.
