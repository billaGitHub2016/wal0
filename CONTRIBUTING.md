# Contributing Guide

Welcome to the Compoder contributing guide! As an AI-powered component code generation engine, we're dedicated to providing the best component code generation experience for frontend engineers, supporting multiple tech stacks, component libraries, AI models, and various scenarios. Every contribution you make is valuable.

## Issue Management

[Find](https://github.com/IamLiuLv/compoder/issues?q=is:issue+is:open) existing issues or [create](https://github.com/IamLiuLv/compoder/issues/new/choose) a new one.

### How to Create an Issue

**1. Feature Requests**

Please provide detailed information about the feature implementation goals, why this feature is needed, and what value it brings.

**2. Other Types (Bug Reports, Performance Optimizations, UI Improvements, Documentation Corrections, etc.)**

- For Bug Reports: Provide detailed descriptions of the issue, reproduction steps, and relevant screenshots or videos
- For Performance Optimizations: Explain performance comparisons before and after optimization, with relevant screenshots or videos
- For UI Improvements: Describe UI comparisons before and after improvement, with relevant screenshots or videos
- For Documentation Corrections: Explain the content and reasons for documentation corrections

### How to Claim an Issue

Based on the issue description, claim issues you're interested in and start coding and submitting PRs associated with the issue. Other developers may claim the same issue, but that's okay - we encourage everyone to participate, learn from each other, and grow together.

## Environment Setup

### 1. Environment Dependencies

- [Node.js](https://nodejs.org/) v18.x or higher
- [pnpm](https://pnpm.io/) v9.x or higher
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 2. Fork the Repository

Visit the [Compoder GitHub repository](https://github.com/IamLiuLv/compoder), click the "Fork" button in the top right corner to create your own copy of the repository.

### 3. Clone the Repository

```bash
# Clone your forked repository
git clone git@github.com:<github_username>/compoder.git
cd compoder

# Install dependencies
pnpm install
```

### 4. Start Docker Containers

```bash
# Docker configuration
cp docker-compose.template.yml docker-compose.yml

# Start MongoDB database
docker compose up -d
```

### 5. Environment Variables and Configuration

```bash
# Fill in the corresponding environment variables
cp .env.template .env

# Configure Model provider (need to replace BaseUrl, API Key)
cp data/config.template.json data/config.json

# Initialize Codegen configuration
cp data/codegens.template.json data/codegens.json
pnpm migrate-codegen
```

### 6. Start Development Server

```bash
# Start Compoder
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000/) to begin development

### 7. Start Storybook Business Component Documentation (Optional)

```bash
pnpm storybook
```

### 8. Start Code Rendering Sandboxes (As Needed)

```bash
# Start Antd rendering sandbox
cd artifacts/antd-renderer
pnpm dev

# Start Shadcn UI rendering sandbox
cd artifacts/shadcn-ui-renderer
pnpm dev

# Start Mui rendering sandbox
cd artifacts/mui-renderer
pnpm dev

# Start Element Plus rendering sandbox
cd artifacts/element-plus-renderer
pnpm dev
```

## Project Structure

### Main Directory Structure

```text
[app/]                    // Next.js application main directory
├── main/                // Main interface related pages
├── commons/            // Common components and utilities
├── api/                // API routes
├── services/           // Service related
└── layout.tsx          // Main layout component

[components/]            // Components directory
├── biz/                // Business components
├── ui/                 // UI base components
└── provider/           // Context provider components

[lib/]                   // Core libraries
├── auth/               // Authentication related
├── config/             // Configuration related
├── db/                 // Database related
└── xml-message-parser/ // XML parsing utilities

[artifacts/]             // Rendering sandbox environments
├── antd-renderer/      // Antd rendering environment
├── shadcn-ui-renderer/ // Shadcn UI rendering environment
├── mui-renderer/       // MUI rendering environment
└── element-plus-renderer/ // Element Plus rendering environment
```

## Submitting a PR

When you're ready:

1. Ensure your code meets standards
   - Use ESLint and Prettier to maintain code style
   - Follow TypeScript type standards
2. Add necessary test cases
   - For new features, add corresponding unit or integration tests
   - Ensure existing tests pass
3. Update relevant documentation
   - If you modified APIs or added new features, ensure documentation is updated
   - For major changes, provide a detailed explanation in the PR description
4. Open a PR to the main branch
   - PR title should concisely describe the changes
   - PR description should include detailed change information, related issue links, etc.

After your PR is merged, you'll be honored in the project's [contributors list](https://github.com/IamLiuLv/compoder/graphs/contributors).

## Code Generation Commands

Compoder provides various code generation commands to quickly create different components and services:

```bash
# Generate business component
compoder generate:biz-component

# Generate page integration
compoder generate:page-integration

# Generate services
compoder generate:services

# Generate SQL API
compoder generate:sql-api

# Refactor business component
compoder refactor:bizcomponent
```

Enter these commands in the Cursor chat agent along with your context and requirements to generate the corresponding code.

## Getting Help

If you encounter issues:

- Join the [GitHub Discussions](https://github.com/IamLiuLv/compoder/discussions) community
- Ask questions in [GitHub Issues](https://github.com/IamLiuLv/compoder/issues)
- Join the WeChat community: Scan the QR code below, add as WeChat friend with the note "Compoder" to be added to the Compoder community where you can learn and exchange ideas with like-minded developers.

<img src="./assets/wechat.png" alt="compoder" width="100px">
