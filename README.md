📝 MicroBlog Platform (Microservices Architecture)

A scalable microservices-based blogging platform built with modern web technologies.
The application supports authentication, post management, user dashboards, and engagement features like likes and views.

🚀 Features
🔐 Authentication & Authorization

User register & login with JWT authentication

Secure protected routes

Author-only edit & delete access for posts

📝 Posts & Engagement

# MicroBlog — Microservices Blogging Platform

![MicroBlog](https://raw.githubusercontent.com/Dwidenbrahma/micro-blogging/main/frontend/public/logo.png)

> A lightweight, microservices-based blogging platform built with React, TypeScript, Node/Express and MongoDB. Organized for clarity and real-world microservices patterns.

---

## Highlights

- JWT-based authentication (stateless)
- Microservices: `auth-service` and `posts-service`
- React + TypeScript frontend with reusable components
- Post engagement: likes, view counts, dashboard for authors
- Simple, denormalized data model for fast reads

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Architecture](#architecture)
3. [Environment Variables](#environment-variables)
4. [Auth Flow](#auth-flow)
5. [Project Structure](#project-structure)
6. [Design Decisions & Future Work](#design-decisions--future-work)

---

## Getting Started

Quick local run (each service runs independently):

```bash
# from repository root
cd backend/services/auth-service
npm install
npm run dev

cd ../posts-service
npm install
npm run dev

# frontend
cd ../../frontend
npm install
npm run dev
```

## Use Postman or the UI to register and login with the auth service, then create posts using the posts service.

## Architecture

This project is split into small services:

- `auth-service` — handles registration, login, JWT issuance
- `users-service` — (user storage / profile) — separate service for user data
- `posts-service` — CRUD for posts, likes, views, dashboard endpoints
- `frontend` — React + TypeScript client
  Services communicate over HTTP; JWT is used to authorize requests across services.

---

## Environment Variables

Create a `.env` in each service with values similar to:
`auth-service/.env`

```dotenv
PORT=4001
JWT_SECRET=microblog_super_secret_2025
DATA_URI=mongodb://127.0.0.1:27017/microblog
USER_SERVICE=http://localhost:4000
```

`posts-service/.env`

```dotenv
PORT=4002
JWT_SECRET=microblog_super_secret_2025
DATA_URI=mongodb://127.0.0.1:27017/microblog
AUTH_SERVICE=http://localhost:4001/auth
```

> Note: Keep the `JWT_SECRET` identical across services that verify tokens.

---

## Auth Flow

1. Client registers or logs in at `auth-service`.
2. `auth-service` creates a JWT containing `userId` and `username`.
3. Client stores token and sends `Authorization: Bearer <token>` to protected endpoints.
4. `posts-service` validates the token and extracts `userId`/`username` for author-related operations.

---

## Project Structure

```
micro-blogging/
├── backend/
│   ├── services/
│   │   ├── auth-service/
│   │   ├── posts-service/
│   │   └── users-service/
|   |
├── frontend/
│   └── src/
```

Key files:

- `backend/services/auth-service/src/controller/auth.controller.ts` — JWT signing logic
- `backend/services/posts-service/src/middleware/auth.ts` — token verification & request augmentation
- `frontend/src/pages/*` — React pages (CreatePost, Dashboard, Login, Register, Edit)

---

## Design Decisions & Future Work

- Denormalize author username into posts for fast reads
- JWT for stateless auth across microservices
- Future improvements: comments, per-post pages, analytics, CI/CD and deployment

### Deployment (Future work)

Planned deployment approach and options:

- Containerize each service with Docker and orchestrate with `docker-compose` for local dev and testing.
- For production, use one of:
  - Managed containers (Render, Fly, Railway) for each service.
  - Kubernetes (AKS / EKS / GKE) for larger scale with autoscaling and service discovery.
  - Vercel / Netlify for the frontend, and a cloud provider (DigitalOcean App Platform, Render) for backend services.
- Use a managed MongoDB service (MongoDB Atlas) with appropriate network rules and a secondary read-replica for scaling read-heavy endpoints.
- Add CI workflows to build images, run tests, and push to registry (GitHub Actions → Docker Hub / GitHub Container Registry).

Deployment checklist:

1. Add `Dockerfile` to each service and a `docker-compose.yml` at the repo root.
2. Configure environment variables via the platform (never commit secrets).
3. Use healthchecks and readiness probes (Kubernetes) for reliability.
4. Set up TLS and a global CDN in front of the frontend assets.

### Performance & Latency Reduction

Targeted measures to reduce latency across the system:

- Caching:

  - Use HTTP caching and CDN for static frontend assets.
  - Add an in-memory cache (Redis) in front of read-heavy endpoints (e.g., top posts, user profile) with short TTLs.

- Database optimizations:

  - Add indexes on frequently queried fields (e.g., `authorId`, `createdAt`, tag fields).
  - Use projection to return only required fields from MongoDB queries.
  - Use connection pooling and tuned pool sizes for each service.

- API & network:

  - Reduce payload sizes (e.g., return excerpt for listing endpoints).
  - Enable gzip/brotli compression on API responses.
  - Keep services collocated in the same cloud region to minimize cross-service latency.

- Scalability:

  - Horizontally scale stateless services behind a load balancer.
  - Offload long-running or non-critical work to background workers (e.g., sending emails, analytics) using a message queue.

- Observability & tuning:
  - Add distributed tracing (OpenTelemetry) to measure end-to-end latency.
  - Monitor key metrics (p95/p99 latency, DB query times, error rates) and tune as needed.

---

---

## Troubleshooting

- If you get `Invalid token` in the posts service: ensure you logged in against the `auth-service` currently running and are using a freshly issued token. Verify `JWT_SECRET` matches in both services.
- Use `jwt.io` or the following command to decode a token:

```bash
node -e "console.log(JSON.stringify(require('jsonwebtoken').decode(process.argv[1]), null, 2))" "<PASTE_TOKEN_HERE>"
```

---

## Author

## Dwiden Brahma

If you'd like, I can also:

- Add a visual architecture diagram and example requests
- Create a `docker-compose.yml` to run services locally
- Convert frontend styling completely to Tailwind utility classes
  Tell me which of the above you'd like next.
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_secret_key

Posts Service
PORT=4002
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

▶️ Running Locally
1️⃣ Clone the repository
git clone https://github.com/Dwidenbrahma/micro-blogging.git
cd micro-blogging

2️⃣ Start Auth Service
cd services/auth-service
npm install
npm run dev

3️⃣ Start Posts Service
cd services/posts-service
npm install
npm run dev

4️⃣ Start Frontend
cd frontend
npm install
npm run dev

🧠 Design Decisions

Denormalized username stored in posts for fast reads

JWT-based stateless authentication

Separate APIs for public and dashboard access

Clean REST API conventions

Defensive validation at API boundaries

🔮 Future Improvements

💬 Comment system

📄 Post detail page

📊 Dashboard analytics

🚀 Deployment using Vercel & Render

🔔 Notifications

👨‍💻 Author

Dwiden Brahma
