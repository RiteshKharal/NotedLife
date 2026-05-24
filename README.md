# 📝 NotedLife
A modern note workspace with email authentication and responsive post previews.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-7.8.0-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)

## ✨ Description
NotedLife is a Next.js app built for sharing and interacting with content/media. This project is ideal for developers exploring secure media-sharing interfaces.

## 💼 Features

- **Email/password authentication** with sign-up and sign-in flows.
- **Session management** that fetches active user session state on page load.
- **Theme support** using `next-themes` for light/dark system-aware rendering.
- **Prisma-backed auth storage** using PostgreSQL and Better Auth.

## 🛠 Tech Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- Supabase
- PostgreSQL
- Better Auth

## 📦 Installation
```bash
# Clone the repository
git clone <repo-url>
cd notedlife

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## 🔐 Environment Variables
```env
DATABASE_URL=postgresql://user:password@localhost:5432/notedlife
```
- `DATABASE_URL` — PostgreSQL connection string(supabase) used by Prisma and auth storage.

## ⭐ Getting Started
```bash
npm run dev
# or
npm run build
npm start
```
Open `http://localhost:3000` in your browser.

## 🌐 API Documentation
- `GET /api/[...all]` — auth session and auth-related GET requests handled by Better Auth.
- `POST /api/[...all]` — auth actions including sign in and sign up via Better Auth.

## 🤝 Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes and push the branch.
4. Open a pull request for review.

## 📄 License
MIT License.

## 👤 Author
RK
