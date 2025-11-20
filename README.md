# Tutor Support System

A modern web application built with React + TypeScript + Vite and Supabase for backend services.

## 📋 Table of Contents

- [System Requirements](#-system-requirements)
- [Project Installation](#-project-installation)
- [Running the Project](#️-running-the-project)
- [Git Workflow](#-git-workflow)

## 🛠 System Requirements

- Node.js >= 22.0.0
- pnpm = 10.21.0
- Git

### Install pnpm

If you don't have pnpm installed, you can install it using npm:

```bash
npm install -g pnpm@10.21.0
```

For more installation options, visit [pnpm installation guide](https://pnpm.io/installation).

## 🚀 Project Installation

### 1. Clone repository

```bash
git clone <repository-url>
cd ReBase
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment setup

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📦 Managing Packages

### Installing packages

```bash
# Install a package
pnpm add <package-name>

# Install dev dependency
pnpm add -D <package-name>
```

**Examples:**

```bash
# Install axios
pnpm add axios

# Install TypeScript types
pnpm add -D @types/node
```

### Removing packages

```bash
pnpm remove <package-name>
```

### Update packages

```bash
# Update specific package
pnpm update <package-name>

# Update all packages
pnpm update
```

## 🏃‍♂️ Running the Project

### Development mode

```bash
pnpm dev
```

Application will run on `http://localhost:5173`

### Production build

```bash
# Build the project
pnpm build

# Preview production build
pnpm start
```

### Other useful scripts

```bash
# Lint code
pnpm lint

# Fix lint issues
pnpm lint:fix

# Check code formatting
pnpm format

# Fix code formatting
pnpm format:fix

# Clean build artifacts
pnpm clean
```

## 🔄 Git Workflow

### Commit Message Convention

The project uses [Conventional Commits](https://www.conventionalcommits.org/):

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Formatting changes that don't affect code logic
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding or fixing tests
- `chore`: Build tasks, package manager configs, etc.

**Examples:**

```bash
git commit -m "feat(auth): add user login functionality"
git commit -m "fix(api): resolve user data fetching issue"
git commit -m "docs: update installation guide"
git commit -m "style(client): format code with prettier"
```

### Hooks

The project has built-in git hooks to ensure code quality:

- **pre-commit**: Run lint and format code
- **commit-msg**: Check commit message format

### Branch Naming

- `main`: Production branch
- `feature/feature-name`: For new features
- `bugfix/bug-description`: For bug fixes
- `hotfix/issue-description`: For urgent production issues

### Standard Workflow

1. **Create a new branch**
   Always branch off from the latest version of `main`.

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **Work on your feature**
   Make your code changes and commit them using the [Conventional Commits](https://www.conventionalcommits.org/) format:

   ```bash
   git add .
   git commit -m "feat(auth): add login functionality"
   ```

3. **Rebase with the latest main branch**
   Before pushing, make sure your branch is up to date with `main`:

   ```bash
   git fetch origin
   git rebase origin/main
   ```

4. **Push your branch to remote**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request (PR)**
   Open a PR to merge your branch into `main` using the project’s PR template.
   Wait for review and approval before merging.

6. **After Merge — Sync and Clean Up**
   Once your PR is merged:

   ```bash
   git checkout main
   git pull origin main
   git branch -d feature/your-feature-name     # delete local branch
   git push origin --delete feature/your-feature-name   # delete remote branch
   ```
