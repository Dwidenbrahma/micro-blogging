# MicroBlog — Microservices Blogging Platform

![MicroBlog](frontend/public/logo.png)

> A scalable, microservices-based blogging platform built with **React, TypeScript, Node.js, Express, and MongoDB**.  
> Designed using real-world backend patterns with independent services and JWT-based authentication.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- User registration & login
- JWT-based stateless authentication
- Protected routes across services
- Author-only access for edit/delete operations

### 📝 Posts & Engagement
- Create, update, delete posts
- Like posts
- Track view counts
- Author dashboard for managing posts

### 💬 Comments
- Add comments to posts
- Fetch comments per post
- Author & user attribution for comments

### 👤 Users
- Centralized user profile service
- User metadata handling
- Decoupled from auth logic

---

## 🧠 Highlights

- Microservices architecture
- Stateless JWT authentication across services
- Denormalized data model for fast reads
- Clean REST APIs
- React + TypeScript frontend
- Easy to scale and extend

---

## 📚 Table of Contents

1. [Architecture](#architecture)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Authentication Flow](#authentication-flow)
6. [Design Decisions](#design-decisions)
7. [Future Improvements](#future-improvements)
8. [Troubleshooting](#troubleshooting)

---

## 🏗 Architecture

This project follows a **microservices architecture**, where each service is independently deployable and scalable.

### Backend Services

- **auth-service**
  - User registration & login
  - JWT issuance

- **users-service**
  - User profile & metadata storage
  - Decoupled from authentication

- **posts-service**
  - CRUD operations for posts
  - Likes, views, dashboard endpoints

- **comments-service**
  - Add & fetch comments for posts
  - Linked with post and user IDs

### Frontend

- **React + TypeScript**
- Communicates with backend services over HTTP
- JWT stored client-side and sent via `Authorization` header

## 🚧 Currently Working On (18th Dec 2025)

- 🤖 **AI Integration**: Adding AI-assisted post writing, summarization, and basic content moderation as a separate service.
- 💬 **Comment Service**: Enhancing comment features with better attribution, optimized fetching, and support for threaded discussions.
- ⚡ **Latency Optimization**: Reducing inter-service latency through query optimization, indexing, and planned Redis caching for high-traffic data.



