## Password Encryption Methods

An overview of various methods used to secure and store user passwords, ranked by their security strength and suitability for different use cases.

## Notes

### Plaintext

**Description**  
Passwords are stored directly in the database without any transformation.

**Security Implications**

- Completely insecure.
- If database is breached, all user passwords are immediately compromised.
- Cannot be reversed or protected against attacks.

**Use Case**

- Never acceptable under any circumstances.

**Security Rating**: 0/5

---

### Symmetric Encryption with a Secret Key

**Description**  
Passwords are encrypted using a reversible cipher (e.g., AES) with a secret key.

**Security Implications**

- Requires secure key management — if the key is leaked, all passwords can be decrypted.
- Allows for password recovery, which is usually not required.
- Breach of the key = total compromise.

**Use Case**

- Rare cases where password recovery is needed (e.g., vault apps).
- Not suitable for authentication systems.

**Pros**

- Reversible (if recovery is needed).
- Well-supported encryption algorithms like AES.

**Cons**

- Complex and risky key management.
- Violates the non-reversible storage principle of password security.

**Security Rating**: 3/5

---

### MD5 / SHA-1

**Description**  
Fast cryptographic hash functions, originally designed for data integrity checks, not for password storage.

**Security Implications**

- Very fast to compute → ideal for brute force and dictionary attacks.
- MD5 is broken and collision-prone. SHA-1 is deprecated by NIST.
- Vulnerable to rainbow table attacks unless combined with a unique salt.

**Use Case**

- Legacy systems only; never use for new password storage systems.

**Security Rating**: 1/5

---

### SHA-256 / SHA-512

**Description**  
Modern cryptographic hash functions that are secure for integrity, but not ideal for password hashing because they are too fast.

**Security Implications**

- Still vulnerable to brute-force attacks due to high speed.
- Should always include:
  - A strong, unique salt
  - Manual stretching (multiple iterations)
  - Optional server-side secret (pepper)
- Not memory-hard → GPU-accelerated attacks are feasible.

**Use Case**

- Acceptable in legacy systems with additional protections.
- Not recommended for new applications.

**Security Rating**: 2/5

---

### bcrypt

**Description**  
Adaptive key derivation function based on the Blowfish cipher. Designed for secure password hashing.

**Features**

- Built-in salt.
- Adjustable cost factor.
- Resistant to brute-force via slow hashing.

**Security Implications**

- Strong choice for secure password hashing.
- Lacks memory-hardness (somewhat vulnerable to advanced hardware).

**Use Case**

- Widely supported in web frameworks.
- Suitable for most authentication systems.

**Security Rating**: 4/5

---

### scrypt

**Description**  
Key derivation function that is both CPU- and memory-intensive.

**Features**

- Resistant to GPU/ASIC attacks.
- Adjustable memory and time cost.
- Includes salt and parallelism configuration.

**Security Implications**

- Slows down attackers significantly.
- More secure than bcrypt in most contexts.

**Use Case**

- Great option for systems requiring strong protection against modern brute-force techniques.

**Security Rating**: 4.5/5

---

### Argon2 (Argon2id preferred)

**Description**  
Winner of the Password Hashing Competition (PHC). State-of-the-art password hashing algorithm.

**Variants**

- Argon2i: side-channel resistant
- Argon2d: GPU attack resistant
- Argon2id: hybrid, recommended

**Features**

- Configurable memory, time, and parallelism.
- Strong resistance to brute-force and hardware attacks.
- Supports salts, secret keys, and associated data.

**Security Implications**

- Best protection currently available.
- Recommended for all new applications.

**Use Case**

- Ideal choice for any modern authentication system.

**Security Rating**: 5/5

## Links

- [Video: Password Storage Tier List: encryption, hashing, salting, bcrypt and beyond](https://youtu.be/qgpsIBLvrGY?si=qGPk8w2uNEUzWGds)

## Thoughts

Based on my research, slow hashing (like bcrypt, scrypt and argon2) is considered the most secure form of password encryption, with hashing with salt taking second place. The primary benefit of using hashing with salt over slow hashing is the significantly faster login speeds, especially under high traffic conditions where users frequently log in and out. Slow hashing could cause delays during login, which I could mitigate using session tokens and cookies, though I'm still learning about them.

If I manage user sessions well, slow hashing might still be the best approach, as its security benefits outweigh the minor performance impact, especially since bcrypt allows me to adjust the work factor for performance. My coach suggested that while the .NET bcrypt library is easy to use and well-abstracted, I shouldn't be overly concerned about the specific encryption method, as long as user data is encrypted. Session management is critical, and if users are logged in for extended periods, the performance impact of slow hashing could be manageable. I'll explore session tokens or JWTs further, but overall, slow hashing seems like a viable choice for my use case.
