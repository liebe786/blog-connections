# Simple Blog

Build a simple full-stack MERN stack blog web application.

Tech Stack

Use:

React + Vite for frontend

Node.js + Express.js for backend

MongoDB for database

Mongoose for all MongoDB database interaction

JWT for authentication

bcrypt/bcryptjs for password hashing

Do not use SQL, Prisma, Supabase, Firebase, or any other database/ORM.

Application Requirements

The application has only two main views:

Login/Signup

Blog Feed

There should be no other pages or features.

Authentication

Login

Create a login page with:

Email

Password

Login button

Link to Signup

Signup

Allow users to register with:

Name

Email

Password

Confirm Password

Signup button

Link back to Login

Passwords must be hashed using bcrypt/bcryptjs.

Use JWT authentication.

Unauthenticated users must only be able to access the Login/Signup view.

After successful authentication, take the user to the Blog Feed.

Blog Feed

The authenticated user sees a single blog page.

The page should contain:

Create Blog

A simple form:

Blog title

Blog content

Publish button

The user can create blogs.

Each blog displays:

Author name

Title

Content

Created date

Follow/Following button for the author

The current user must not see a Follow button for themselves.

Following System

Users can follow other users.

When clicking Follow:

Add that user's ID to the current user's following list.

Their name should immediately appear in the Following sidebar.

Their blogs should receive priority in the feed.

When clicking Unfollow:

Remove their ID from the following list.

Remove them from the sidebar.

Their blogs should no longer receive priority.

A user cannot follow themselves.

Following Sidebar

On the right side of the Blog Feed, display:

Following

John       Unfollow
Rahul      Unfollow
Priya      Unfollow


Only show users that the current user follows.

There should be no separate Following page.

Blog Feed Algorithm

This logic should be implemented on the backend, not the frontend.

If the current user follows at least one user:

Display:

Blogs written by followed users first.

Newest followed-user blogs first.

Other blogs after them.

If the current user follows nobody:

Return a maximum of 10 random blogs.

Use MongoDB/Mongoose's aggregation capabilities to randomly select the blogs.

Do not fetch every blog and perform randomization in React.

Database

Use MongoDB + Mongoose.

The coding AI does not need to create the database itself. Instead, implement the Mongoose models and provide clear instructions for the user to create/connect the MongoDB database.

Use these models.

User Model

{
  name: String,
  email: String,
  password: String,
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}


Use timestamps.

The password must never be returned in normal API responses.

Add appropriate validation and make email unique.

Blog Model

{
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}


Use timestamps.

MongoDB Setup Instructions

The application must use an environment variable for the MongoDB connection.

Create:

server/.env


with:

MONGO_URI=mongodb://127.0.0.1:27017/blog_app
JWT_SECRET=your_secret_key
PORT=5000


For a local MongoDB installation, the database name should be:

blog_app


The application should connect using Mongoose:

mongoose.connect(process.env.MONGO_URI)


The database and collections do not need to be manually created.

MongoDB will create the blog_app database and collections automatically when data is inserted.

If the user wants to use MongoDB Atlas instead, explain that they can replace MONGO_URI with their Atlas connection string.

Do not hardcode the MongoDB URI, username, password, or JWT secret in source code.

Mongoose Requirements

Create separate Mongoose models:

models/User.js
models/Blog.js


Use Mongoose references between:

User.following → User
Blog.author → User


Use populate() where appropriate to retrieve author names and following-user information.

Use Mongoose aggregation for the random 10-blog feed when the user follows nobody.

Backend API

Implement these REST endpoints.

Authentication

POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me


Blogs

POST /api/blogs
GET  /api/blogs


Following

POST   /api/users/:id/follow
DELETE /api/users/:id/follow
GET    /api/users/following


All endpoints that require a logged-in user must use JWT authentication middleware.

JWT Authentication

After login/signup, generate a JWT containing the user's ID.

Create authentication middleware that:

Reads the JWT.

Verifies it.

Gets the user ID.

Loads the user.

Attaches the user to the request.

Use this middleware for protected routes.

Frontend

Use React + Vite.

Keep the frontend simple.

Suggested components:

Login
Signup
BlogPage
CreateBlog
BlogCard
FollowingSidebar


There should not be unnecessary pages.

The BlogPage should contain both:

Blog feed

Create Blog form

Following sidebar

The header can contain:

App name

Current user's name

Logout button

UI Layout

Use a simple layout like:

------------------------------------------------
                 Blog App              Logout
------------------------------------------------

Create a Blog                    Following
----------------                 ----------------
Title                            John    Unfollow
Content                          Rahul   Unfollow
[ Publish ]

------------------------------------------------

John
My First Blog
This is my blog content...
[Following]

------------------------------------------------

Rahul
Another Blog
Blog content...
[Follow]

------------------------------------------------


Keep the UI minimal and responsive.

Do not turn this into a social-media-style application.

Strictly Do NOT Add

Do not implement:

Likes

Comments

Shares

Bookmarks

Search

Categories

Tags

Notifications

Messaging

User profiles

Profile editing

Images

Videos

File uploads

Admin panel

Dashboard

Analytics

Recommendations

Pagination

Infinite scrolling

Blog editing

Blog deletion

Any other features

The application should only support:

Signup → Login → Create Blog → View Blogs → Follow/Unfollow Users → Prioritized Feed → Logout

What You Must Provide

Implement the complete frontend and backend code.

For the database, do not pretend to create or manage MongoDB yourself.

Instead:

Create the Mongoose models.

Create the Mongoose connection code.

Create the required .env variables.

Clearly explain how the user should install/start MongoDB locally OR use MongoDB Atlas.

Explain that the database blog_app will be created automatically.

Explain how to start the backend.

Explain how to start the frontend.

Explain any required npm installations.

The final application should work end-to-end once the user starts MongoDB and provides the MONGO_URI.

Do not add functionality that is not explicitly requested in this specification.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b8d8d120-3f39-43ec-813a-d98fb20d28c1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
