# Contributing Guidelines

Thanks for contributing to **AI-Powered Job Prep**! 🎉
This document explains how we work on the project to keep `main` stable and green.

---

## 📝 Commit Messages

We use the [Conventional Commits](https://www.conventionalcommits.org/) standard.

**Format:**

```
<type>(<scope>): <short summary>
```

### Types

- **feat**: new feature
- **fix**: bug fix
- **docs**: documentation only changes
- **style**: CSS or non-logic code changes (formatting, themes)
- **refactor**: code change that doesn’t fix a bug or add a feature
- **test**: adding or updating tests
- **chore**: maintenance tasks (deps, configs, build scripts)
- **ci**: changes to CI/CD pipelines

### Scope

Optional. The area of code affected, e.g. `auth`, `dashboard`, `env`, `theme`.

### Summary

A short, imperative description (no period at the end).

---

### ✅ Examples

```
feat(dashboard): add drag-and-drop for tasks
fix(api): correct response code for unauthorized
style(theme): update globals.css with tweakcn theme
chore(env): adjust env schema in server.ts
ci(actions): add Codecov coverage reporting
```

> Tip: we use a `.gitmessage` template configured via
> `git config commit.template .gitmessage` to guide commit messages.

---

## 🚀 Workflow: Branch → PR → CI → Merge

To keep `main` always green, **never push directly to `main`**.
All work goes through feature branches and pull requests.

1. **Create a feature branch**

   ```bash
   git switch -c feat/my-change
   ```

   Use `feat/`, `fix/`, `chore/`, etc. prefixes.

2. **Commit locally**

   ```bash
   git add .
   git commit
   ```

   Follow [Conventional Commits](#📝-commit-messages).

3. **Push to GitHub**

   ```bash
   git push origin feat/my-change
   ```

4. **Open a Pull Request**
   - Target branch: `main`
   - GitHub Actions runs the `ci.yml` workflow
   - Vercel builds a Preview URL

5. **Wait for checks to pass** ✅
   - CI (lint, typecheck, test, build) must be green
   - Review the Preview deployment if UI changes are involved

6. **Squash & merge**
   - Use GitHub’s **“Squash and merge”** option
   - One commit per feature/PR keeps history clean

---

## 🛠 Local Setup

To get the app running locally:

```bash
pnpm install
pnpm dev
```

Environment variables go in `.env.local` — see `src/data/env/server.ts` for required keys.

---

## 📦 Tooling

- **Husky + lint-staged**: enforce formatting before commit
- **.gitmessage**: ensures consistent commit messages
- **Branch protection**: requires CI to pass before merge
- **Vercel**: deploys previews for every PR

---

✨ Thanks again for helping make **AI-Powered Job Prep** better!
