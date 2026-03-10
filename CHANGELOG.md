# 📋 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- User authentication
- Campaign creation and management
- Markdown support for notes

---

## [0.1.0] - 2025-06-01

### Added

- Session CRUD — create, read, update, and delete sessions
- Session search by title and note content
- Responsive sidebar navigation with mobile support
- Copy session content to clipboard
- Toast notifications for user feedback
- Clean Architecture structure with use cases and repository pattern
- Prisma ORM with PostgreSQL
- Unit tests with Jest for use cases, repository, and components
- E2E tests with Playwright for all critical user flows
- CI pipeline with GitHub Actions (lint, typecheck, tests, build)
- Docker Compose setup for local development database
- ESLint + Prettier configuration
- Lefthook for pre-commit hooks

---

[Unreleased]: https://github.com/3salles/taverns-notes/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/3salles/taverns-notes/releases/tag/v0.1.0
