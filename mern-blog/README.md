# MERN Blog App

Minimal MERN blog: signup/login, create blogs, follow/unfollow authors, prioritized feed.

```
mern-blog/
  server/   Node + Express + Mongoose + JWT
  client/   React + Vite
```

## 1. MongoDB

**Local install**

- macOS: `brew tap mongodb/brew && brew install mongodb-community && brew services start mongodb-community`
- Ubuntu: install `mongodb-org`, then `sudo systemctl start mongod`
- Windows: install MongoDB Community Server (runs as a service automatically)

Database name: `blog_app`. You do **not** need to create the database or any
collections — MongoDB creates `blog_app` and its collections automatically on
the first insert.

**MongoDB Atlas instead?** Create a free cluster, add a database user, allow
your IP, then copy the connection string and use it as `MONGO_URI`, e.g.:

```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/blog_app?retryWrites=true&w=majority
```

## 2. Backend

Create `server/.env` (copy from `server/.env.example`):

```
MONGO_URI=mongodb://127.0.0.1:27017/blog_app
JWT_SECRET=your_secret_key
PORT=5000
```

Then:

```bash
cd server
npm install        # express, mongoose, bcryptjs, jsonwebtoken, dotenv, cors, nodemon
npm run dev        # http://localhost:5000
```

## 3. Frontend

```bash
cd client
npm install        # react, react-dom, vite, @vitejs/plugin-react
npm run dev        # http://localhost:5173
```

Vite proxies `/api` to `http://localhost:5000`, so no extra config is needed.

## API

| Method | Endpoint                  | Auth | Purpose                    |
| ------ | ------------------------- | ---- | -------------------------- |
| POST   | `/api/auth/signup`        | no   | Register, returns JWT      |
| POST   | `/api/auth/login`         | no   | Login, returns JWT         |
| GET    | `/api/auth/me`            | yes  | Current user               |
| POST   | `/api/blogs`              | yes  | Create blog                |
| GET    | `/api/blogs`              | yes  | Prioritized feed           |
| POST   | `/api/users/:id/follow`   | yes  | Follow user                |
| DELETE | `/api/users/:id/follow`   | yes  | Unfollow user              |
| GET    | `/api/users/following`    | yes  | Users the current user follows |

## Feed algorithm (backend)

- Following ≥ 1 user: aggregation adds a `priority` field (`0` for followed
  authors, `1` otherwise) and sorts by `priority, createdAt desc` — followed
  blogs first, newest first, then everything else.
- Following nobody: `$sample: { size: 10 }` returns up to 10 random blogs.

Passwords are hashed with bcryptjs and the `password` field is `select: false`,
so it is never returned by normal API responses.
