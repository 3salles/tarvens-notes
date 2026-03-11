<p align="center">
  <img src="docs/images/sessions.png" alt="Taverns&Notes" width="600">
</p>

<h1 align="center">🎲 Taverns&Notes</h1>

<p align="center">
  <strong>Organize tabletop RPG campaigns, sessions, and notes — all in one place.</strong>
</p>

<p align="center">
  <a href="https://taverns-notes.vercel.app/">Live Demo</a> ·
  <a href="#-features">Features</a> ·
  <a href="#-getting-started">Getting Started</a> ·
  <a href="docs/architecture.md">Architecture</a> ·
  <a href="#-roadmap">Roadmap</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/3salles/taverns-notes/ci.yml?branch=main&style=for-the-badge&label=CI" alt="CI Status">
  <img src="https://img.shields.io/github/repo-size/3salles/taverns-notes?style=for-the-badge" alt="Repo Size">
  <img src="https://img.shields.io/github/languages/count/3salles/taverns-notes?style=for-the-badge" alt="Languages">
  <img src="https://img.shields.io/github/issues/3salles/taverns-notes?style=for-the-badge" alt="Issues">
  <img src="https://img.shields.io/github/issues-pr/3salles/taverns-notes?style=for-the-badge" alt="PRs">
  <img src="https://img.shields.io/static/v1?label=License&message=MIT&color=blue&style=for-the-badge" alt="License">
</p>

---

## 📖 About

Taverns&Notes is a web application for tabletop RPG groups to organize their campaigns. Game Masters and players can register sessions, store notes, and keep track of every important detail from their adventures — so nothing gets lost between sessions.

Built with **Next.js 16**, **Prisma**, and **PostgreSQL**, following **Clean Architecture** principles for maintainability and testability.

## ⚙️ Features

- ✅ Create, edit, and delete sessions
- ✅ Rich session notes
- ✅ Search sessions by title or content
- ✅ Responsive sidebar navigation
- ✅ Copy session content
- ✅ Toast notifications for user feedback
- ✅ Multi-language support (Portuguese and English)
- 🚧 Campaign creation and management _(coming soon)_
- 🚧 User authentication _(coming soon)_

## 🖼️ Screenshots

### Sessions

![Sessions](docs/images/sessions.png)

## 🧰 Tech Stack

| Layer               | Technology                               |
| ------------------- | ---------------------------------------- |
| **Framework**       | Next.js 16 (App Router + Server Actions) |
| **Language**        | TypeScript                               |
| **Database**        | PostgreSQL + Prisma ORM                  |
| **Styling**         | Tailwind CSS 4 + Radix UI                |
| **Forms**           | React Hook Form + Zod                    |
| **i18n**            | next-intl (pt / en)                      |
| **Testing**         | Jest (unit) + Playwright (E2E)           |
| **CI/CD**           | GitHub Actions                           |
| **Deploy**          | Vercel                                   |
| **Package Manager** | pnpm                                     |

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 22
- **pnpm** ≥ 9
- **Docker** (for local PostgreSQL)

### 1. Clone the repository

```bash
git clone https://github.com/3salles/taverns-notes.git
cd taverns-notes
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your database URL if needed. The default works with the Docker Compose setup.

### 3. Start the database

```bash
docker compose up -d
```

### 4. Install dependencies and set up the database

```bash
pnpm install
pnpm db:generate
pnpm db:migrate
```

### 5. (Optional) Seed sample data

```bash
pnpm db:seed
```

### 6. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📜 Available Scripts

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `pnpm dev`           | Start development server       |
| `pnpm build`         | Build for production           |
| `pnpm start`         | Run production build           |
| `pnpm lint`          | Run ESLint                     |
| `pnpm typecheck`     | Run TypeScript type checking   |
| `pnpm test`          | Run unit tests                 |
| `pnpm test:watch`    | Run tests in watch mode        |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm test:e2e`      | Run Playwright E2E tests       |
| `pnpm test:e2e:ui`   | Run E2E tests with UI mode     |
| `pnpm db:generate`   | Generate Prisma client         |
| `pnpm db:migrate`    | Run database migrations        |
| `pnpm db:seed`       | Seed the database              |

## 📁 Project Structure

```
taverns-notes/
├─ .github/workflows/     # CI pipeline
├─ docs/                   # Documentation & images
│  └─ architecture.md      # Detailed architecture docs
├─ e2e/                    # Playwright E2E tests
├─ messages/               # i18n translation files (pt.json, en.json)
├─ prisma/                 # Database schema & migrations
├─ public/                 # Static assets
├─ src/
│  ├─ app/                 # Next.js App Router (pages + server actions)
│  │  └─ [locale]/         # Locale-prefixed routes (pt / en)
│  ├─ components/          # Reusable UI components
│  ├─ core/                # Business logic (Clean Architecture)
│  │  ├─ application/      # Use cases & DTOs
│  │  └─ domain/           # Entities & repository contracts
│  ├─ i18n/                # next-intl routing & request config
│  ├─ infra/               # Infrastructure implementations
│  ├─ lib/                 # Shared utilities
│  ├─ middleware.ts         # Locale routing middleware
│  ├─ styles/              # Global styles
│  └─ tests/               # Unit & component tests
├─ docker-compose.yml      # Local PostgreSQL
└─ package.json
```

> 📐 For a deep dive into the architecture, layers, and technical decisions, check the **[Architecture Documentation](docs/architecture.md)**.

## 🗺️ Roadmap

### Phase 1 — Foundation ✅

- [x] Session CRUD (create, read, update, delete)
- [x] Session search
- [x] Responsive layout with sidebar
- [x] CI pipeline (lint, typecheck, tests, build)
- [x] E2E tests with Playwright
- [x] Clean Architecture with use cases

### Phase 2 — Core Features 🚧

- [ ] User authentication (NextAuth.js / Clerk)
- [ ] Campaign creation and management
- [ ] Associate sessions with campaigns
- [ ] Markdown support for notes (MDX editor)
- [ ] Rich text editor

### Phase 3 — Collaboration 🔮

- [ ] Campaign sharing between users
- [ ] Role-based access (Game Master / Player)
- [ ] Real-time collaborative editing
- [ ] Comments on sessions

### Phase 4 — Polish & Scale 🚀

- [ ] Export session notes (PDF / Markdown)
- [ ] Mobile-first improvements (PWA)
- [ ] Dark/Light theme toggle
- [ ] Notification system
- [ ] API rate limiting
- [ ] Analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your PR passes all CI checks (lint, typecheck, tests, build).

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 🔒 Security

If you discover a security vulnerability, please see our [Security Policy](SECURITY.md).

## 👩‍💻 Author

Made with ❤️ by [Beatriz Salles](https://github.com/3salles)

---

<p align="center">
  <sub>If this project helped you, consider giving it a ⭐</sub>
</p>
