<h1 align="center">📝 Note Taking App</h1>

Simple note taking app built using the MERN stack (MongoDB, Express.js, React, Node.js) with Typescript.

## Getting started

To get started with this project, run:

```bash
git clone https://github.com/Abdullah-988/note-taking-app.git
```

Setup `.env` files,

`frontend/.env` your backend url (use http://localhost:5555 as a start):

```
VITE_BACKEND_API="http://localhost:5555"
```

`backend/.env` make sure PORT is the same in the frontend VITE_BACKEND_API url port (5555):

```
MONGODB_URL=
PORT=5555
JWT_SECRET=
```

then in each folder (frontend and backend) run:

```bash
npm install
```

and

```bash
npm run dev
```
