# Session Management

This document explores strategies for managing user sessions in web applications using JWTs and cookies. It discusses how authentication data can be stored, transmitted, and secured to ensure a safe and efficient user experience.

## Notes

### Authentication vs Authorization: An Introduction

Authentication verifies a user's identity (e.g., via login credentials), while authorization determines what resources that user can access. These foundational concepts help secure web applications. To maintain authentication state, developers often use either JWTs or cookie-based authentication. Both serve the same purpose—keeping users logged in—but differ significantly in how they're structured, stored, and applied across use cases.

---

### JWT Authentication

**What is JWT Authentication?**

JWT (JSON Web Token) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. It is commonly used in stateless authentication for modern web apps, and the data in a JWT can be verified and trusted because it is digitally signed.

**Structure of a JWT**

A JWT has three parts, separated by dots (`.`):

1. **Header**  
   Contains metadata about the token, such as the type (JWT) and the signing algorithm used (e.g., HMAC, RSA).

2. **Payload**  
   Contains the actual data, or "claims", about the user or subject, such as user ID, roles, and other metadata.

3. **Signature**  
   Created by encoding the header and payload and signing it with a secret or private key to ensure the token hasn't been tampered with.

**How JWT Authentication Works**

- **User logs in**: The client sends their credentials to the server.
- **Token generation**: Upon successful login, the server creates a JWT that includes user-related information (like ID and permissions).
- **Client stores the token**: The JWT is sent back to the client and stored in `localStorage` or `sessionStorage`.
- **Token included in requests**: On future requests, the token is sent in the `Authorization` header, prefixed with `Bearer`.
- **Token verification**: The server verifies the token's signature and claims to authenticate the request.

**Benefits of JWT Authentication**

- **Stateless**: No session needs to be stored on the server; JWTs are self-contained.
- **Decoupled from cookies**: Tokens can be sent via HTTP headers, useful in CORS and mobile/API contexts.
- **Performance**: Compact, URL-safe, and quick to encode/decode.

**Drawbacks of JWT Authentication**

- **Security concerns**: JWTs stored in the browser (e.g., localStorage) are susceptible to XSS attacks. If stolen, they remain valid until expiration.
- **No built-in revocation**: JWTs cannot be invalidated server-side once issued, unless additional mechanisms like blacklisting are implemented.

---

### Cookie-based Authentication

**What is Cookie-based Authentication?**

Cookie-based Authentication is the traditional method of maintaining authentication state in web applications, primarily in server-rendered applications. A unique session ID is sent to the client in the form of a cookie after successful login.

**How Cookie-based Authentication Works**

1. **User logs in**: User credentials are validated.
2. **Session creation**: Server creates a session with user data.
3. **Cookie sent to client**: Server sends session ID as a cookie.
4. **Cookie in requests**: Browser sends the cookie in future requests.
5. **Server-side validation**: Server verifies session using the cookie.

**Benefits of Cookie-based Authentication**

- **Built-in security features**: HttpOnly and Secure flags protect against XSS and MITM attacks.
- **Automatic handling by the browser**: Cookies are automatically included in requests.
- **Session revocation**: Server can easily invalidate sessions.

**Drawbacks of Cookie-based Authentication**

- **Stateful**: Server stores session data, which can cause scaling challenges.
- **Tied to browsers**: Cookies are mainly used in browsers, limiting mobile/API use.
- **Cross-origin limitations**: CORS restrictions complicate cross-domain requests.

---

### Key Differences Between JWT and Cookie Authentication\*\*

- **Stateless vs. Stateful**: JWT is stateless; Cookie-based is stateful.
- **Storage**: JWT can be stored in localStorage or cookies; Cookie-based stores session ID in cookies.
- **Usage**: JWT is ideal for APIs and SPAs; cookies work well for traditional web apps.
- **Security Concerns**: JWT can be exposed to XSS attacks; cookies use HttpOnly and Secure for protection.
- **Revocation**: JWT is harder to revoke; cookie-based sessions can be easily invalidated.

---

### Conclusion

Both JWT and cookie-based authentication have their strengths and weaknesses. JWT shines in stateless, scalable environments, making it a preferred choice for modern APIs and mobile apps. On the other hand, cookie-based authentication, with its long-standing history and server-side control, is well-suited for traditional web applications where sessions and revocation are key concerns.

Choosing between these two methods depends largely on the specific requirements of your application, including the environment, security considerations, and scalability needs. Understanding the differences will help you implement the right solution for your use case.

## Links

- [JWT vs Cookie-based Authentication: Key Differences and Best Use Cases](https://medium.com/@mohamad.h.itawi/jwt-vs-cookie-based-authentication-key-differences-and-best-use-cases-52f74ddca93f)
- [Video: Authentication in React with JWTs, Acess and Refresh Tokens (Complete Tutorial)] (https://youtu.be/AcYF18oGn6Y?si=r1AcE-JA7Lw-_tLC)

## Thoughts

The usage of my application would require the user to go in and out of the application on a consistent basis which would be extremely tedious if the user had to log in all the time. I could manage the session using a session cookie and set the timeout to 30 days or so, but that would be extremely unsafe as it is vulnerable to session hijacking and cross-site scripting (XSS) attacks. If an attacker gains access to the cookie, they can use the token until it expires. Long-lived tokens also make it harder to implement proper session management or revocation, as they remain valid even if the user's account is compromised or logged out. Shorter expiration times reduce this risk by limiting the window in which stolen tokens can be exploited.

Using a JWT as a long-term access token is also risky because the token is often stored client-side (e.g., in local storage), making it susceptible to XSS attacks. If an attacker can inject malicious scripts into the application, they can steal the token and use it. Also, JWTs typically lack built-in revocation mechanisms, meaning they remain valid until they expire. Without proper security measures (like short expiration times, secure storage, and HTTP-only cookies), long-lived JWTs can significantly increase the chances of unauthorized access.

The best approach I have found is a hybrid strategy combining both - using an short-lived access token (stored as a JWT, client side in memory - not local storage) for temporary authorization and a long-lived refresh token (stored server side as an http-only cookie) for long term authentication. This approach ensures temporary access is granted through the access token while the refresh token can be used to obtain new access tokens, minimizing the risk of token theft and improving overall security. This approach also works very well with react, as you can store the token is a state variable. A link to which can be found [here](https://youtu.be/AcYF18oGn6Y?si=r1AcE-JA7Lw-_tLC).
