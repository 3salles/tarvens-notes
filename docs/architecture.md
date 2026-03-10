# 🏗️ Application Architecture

## 🔭 Overview

Taverns&Notes follows a **layered architecture** inspired by Clean Architecture principles, ensuring separation of concerns and testability across all layers.

```
🖥️ Client (React UI)
        ↓
⚡ Next.js Server Actions
        ↓
🧠 Use Cases (Application Layer)
        ↓
📦 Repository (Infrastructure Layer)
        ↓
🗄️ Prisma ORM
        ↓
🐘 PostgreSQL Database
```

## 🧩 Layer Responsibilities

### 🖥️ Presentation Layer (`src/app/`, `src/components/`)

Handles all user-facing concerns: pages, forms, UI components, and server actions. Built with Next.js App Router and React Server Components.

### 🧠 Application Layer (`src/core/application/`)

Contains **use cases** that orchestrate business logic. Each use case represents a single operation (e.g., `CreateSessionUseCase`, `DeleteSessionUseCase`). DTOs and validation schemas (Zod) also live here.

### 🏛️ Domain Layer (`src/core/domain/`)

Defines **entities** and **repository interfaces** — the contracts that the infrastructure layer must implement. This layer has zero external dependencies.

### 🔌 Infrastructure Layer (`src/infra/`)

Implements the repository interfaces using concrete technologies (Prisma). This is the only layer that knows about the database.

## 📁 Project Structure

```
src/
├─ app/                          # Next.js App Router
│  ├─ actions/                   # Server Actions (controllers)
│  │  └─ session.actions.ts
│  ├─ [id]/page.tsx              # Session detail page
│  ├─ new-session/page.tsx       # New session page
│  ├─ layout.tsx                 # Root layout
│  └─ page.tsx                   # Home page
│
├─ components/                   # Reusable UI components
│  ├─ ui/                        # Base components (Button, Input, Form...)
│  ├─ sidebar/                   # Navigation sidebar
│  ├─ session/                   # Session-specific components
│  ├─ logo/                      # Branding
│  └─ button-actions/            # Action buttons (Copy, etc.)
│
├─ core/                         # Business logic (framework-agnostic)
│  ├─ application/session/       # Use cases & DTOs
│  │  ├─ create-session.use-case.ts
│  │  ├─ create-session.dto.ts
│  │  ├─ update-session.use-case.ts
│  │  ├─ update-session.dto.ts
│  │  ├─ delete-session.use-case.ts
│  │  └─ search-session.use-case.ts
│  └─ domain/sessions/           # Entities & repository contracts
│     ├─ session.entity.ts
│     └─ session.repository.ts
│
├─ infra/                        # External implementations
│  └─ repository/
│     └─ prisma-session.repository.ts
│
├─ lib/                          # Shared utilities
│  ├─ prisma.ts                  # Prisma client singleton
│  ├─ utils.ts                   # General helpers
│  └─ test-utils.tsx             # Test utilities
│
├─ styles/
│  └─ globals.css                # Global styles (Tailwind)
│
└─ tests/                        # Automated tests (mirrors src/)
   ├─ app/actions/               # Server action tests
   ├─ core/application/          # Use case unit tests
   ├─ infra/                     # Repository & component tests
   └─ components/                # UI component tests
```

## 🗃️ Data Model

Current core entity:

```
Session
├─ id          (String, CUID)
├─ title       (String)
├─ note        (String)
├─ sessionDate (DateTime)
├─ createdAt   (DateTime)
└─ updatedAt   (DateTime)
```

### 🗺️ Planned Entities

```
User ─────────┐
              ▼
Campaign ────── CampaignMember
  │
  ▼
Session
  │
  ▼
Note
```

## ⚙️ Technical Decisions

| Decision               | Rationale                                                                       |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Next.js 16**         | Fullstack capabilities, App Router, Server Actions, simple deployment on Vercel |
| **Clean Architecture** | Testable, framework-agnostic business logic; easy to swap infrastructure        |
| **Prisma**             | Type-safe ORM, auto-generated client, seamless migrations                       |
| **PostgreSQL**         | Reliable relational database, great for structured campaign data                |
| **Server Actions**     | Eliminates need for separate API routes; co-located with UI                     |
| **Zod**                | Runtime validation with TypeScript type inference for DTOs                      |
| **pnpm**               | Fast, disk-efficient package manager with strict dependency resolution          |

## 🧪 Testing Strategy

The project uses a multi-layered testing approach:

- **Unit tests** (Jest): Use cases, repository logic, and UI components
- **E2E tests** (Playwright): Full user flows — create, update, delete, search sessions, responsive sidebar
- **CI pipeline** (GitHub Actions): Lint → Typecheck → Unit tests → Build on every pull request

## 🐳 Infrastructure

- **Development**: Docker Compose for local PostgreSQL (port 5433)
- **Production**: Vercel (Next.js) + managed PostgreSQL
- **CI/CD**: GitHub Actions on pull requests

## 🔗 Key Dependencies

| Package                           | Purpose                                 |
| --------------------------------- | --------------------------------------- |
| `next`                            | Framework (App Router + Server Actions) |
| `react-hook-form`                 | Form state management                   |
| `@hookform/resolvers`             | Zod integration for forms               |
| `zod`                             | Schema validation                       |
| `prisma`                          | Database ORM                            |
| `nuqs`                            | URL query state (search)                |
| `sonner`                          | Toast notifications                     |
| `lucide-react`                    | Icons                                   |
| `motion`                          | Animations                              |
| `radix-ui`                        | Accessible UI primitives                |
| `tailwind-merge` + `clsx` + `cva` | Styling utilities                       |
