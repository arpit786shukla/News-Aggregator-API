# News Aggregator Node Project

|           Endpoint | Description                                                    |
| -----------------: | :------------------------------------------------------------- |
|   `POST /register` | Register a new user.                                           |
|      `POST /login` | Log in a user.                                                 |
| `GET /preferences` | Retrieve the news preferences for the logged-in user.          |
| `PUT /preferences` | Update the news preferences for the logged-in user.            |
|        `GET /news` | Fetch news articles based on the logged-in user's preferences. |



- **in-memory data store** (e.g., an array)
- **external news APIs to fetch** news articles

- Implement a **caching mechanism** to store news articles and reduce the number of calls to external news APIs. Use async/await and Promises to handle cache updates and retrievals.
- [ ] Allow users to mark articles as "read" or "favorite". Implement endpoints to:

|                    Endpoint | Description                                 |
| --------------------------: | :------------------------------------------ |
|       `POST /news/:id/read` | Mark a news article as read.                |
|   `POST /news/:id/favorite` | Mark a news article as a favorite.          |
|            `GET /news/read` | Retrieve all read news articles.            |
|       `GET /news/favorites` | Retrieve all favorite news articles.        |
| `GET /news/search/:keyword` | Search for news articles based on keywords. |

- [ ] Implement a mechanism to periodically update the cached news articles in the background, simulating a real-time news aggregator.

### Schema

```js
[
  {
    id: "string",
    username: "string",
    password: "string",
    preferences: { categories: [Array], sources: [Array] },
    // "createdAt": Date.now() // a.k.a Unix epoch // TODO
  },
];
```
