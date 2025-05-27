<div align="center">

<h1 align="center" style="border-bottom: none">
    <b>
        Wal0<br>
    </b>
    AI-Powered Website Generator<br>
</h1>

Wal0 is an open-source AI-powered website code generation engine that integrates modern frontend tech stacks with various AI model capabilities. You can use it to generate website and publish it to Walrus

</div>

## 🔥 Core Features:

**Customizable Codegen (Component Code Generator)**: Freely customize component code generators based on various tech stacks, component libraries, scenarios, code specifications, and AI models.

**1. Tech Stack Customization**

Customize Codegens based on specific technology frameworks (such as React, Vue, HTML...)

**2. Component Library Customization**

Customize Codegens based on any open-source & private component libraries (such as Mui, Antd, Element-Plus, Shadcn UI, company private component libraries...)

**3. Scenario Customization**

Customize Codegens for specific scenarios (such as Landing Pages, Email Templates, Admin Management Systems, APP Prototypes, Data Cards, Promotional Posters...)

**4. Code Specification Customization**

Customize Codegens based on specific code specifications (such as code file structure, styling approaches...)

**5. Publish site to Walrus

Publish and update your website to Walrus with one click


## 🌟 Basic Functions

- Prompt (Text, Image) To Code: Input text or images to generate component code

- Code Version Iteration: Support code version iteration, view historical versions, and generate new code based on any version

- Online Code Fine-tuning: Support online code fine-tuning with an integrated code editor for intuitive code adjustment and saving

- Real-time Code Preview: Built-in real-time preview sandbox environment supporting various tech stacks (such as React, Vue, open-source packages, private packages) with second-level rendering

## 🛣️ Roadmap

We are continuously improving Wal0 and will launch more exciting new features in the future:

✅ Utilize the Shadcn/UI component library as a template for page generation.

✅ Support more efficient development workflows, such as code version iteration, online code fine-tuning, and real-time code preview sandbox.

✅ Support one-click publishing of websites to Walrus, support updating already published Walrus sites, and support transferring already published Walrus sites to a specified wallet.

✅ Support recharging SUI to the account for paying AI model invocation fees and Walrus site transaction fees.

Develop more component library templates, such as Antd, Mui, etc.

Create a web template marketplace where users can publish their web code for other users to use.

Supports users to upload static web page files for publishing Walrus sites.

Suports user generate deapp and publish to Walrus.


## Quick Start

### Local Development

**1. Environment Setup**

- [Node.js](https://nodejs.org/) v18.x or higher
- [pnpm](https://pnpm.io/) v9.x or higher
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Sui Client](https://docs.sui.io/guides/developer/getting-started/sui-install)
- [Walrus Client](https://docs.sui.io/guides/developer/getting-started/sui-install)
- [site-builder](https://docs.wal.app/walrus-sites/tutorial-install.html#installing-the-site-builder)
- [bunjs](https://bun.sh/)

**2. Clone Repository and Initialize Dependencies**

```bash
# Clone the repository
git clone https://github.com/billaGitHub2016/wal0.git
cd wal0

# Install dependencies
pnpm install
```

**3. Start Docker Container**

```bash
# Docker configuration
cp docker-compose.template.yml docker-compose.yml

# For local development, mainly used to start MongoDB database
docker compose up -d

# or
docker-compose up -d
```

**4. Environment Variables & Configuration Files**

```bash
# Fill in the corresponding environment variables
cp .env.template .env

# Model provider configuration (need to replace BaseUrl, API Key)
cp data/config.template.json data/config.json

# Codegen configuration initialization
cp data/codegens.template.json data/codegens.json
pnpm migrate-codegen
```

**5. Copy site-builder to the public directory**

```bash
cd public
mkdir site-builder

# Copy site-builder to the public directory
```

**6. Start Wal0**

```bash
pnpm dev
```

**7. Start Code Rendering Sandbox (Artifacts)**

```bash
# Start Shadcn UI rendering sandbox
cd artifacts/shadcn-ui-renderer
pnpm dev
```
**8. Start Walrus site server**

```bash
# Clone the repository
git clone https://github.com/MystenLabs/walrus-sites.git
cd walrus-sites/portal
bun install

# Start Walrus site server
cd server
bun run start
```
**9. Publish contract to testnet

```bash
# build contract
cd move
sui move build

# publish contract
sui client publish --gas-budget 100000000 
```

# Start Walrus site server
cd server
bun 

### Deployment with Docker

Deploy your own feature-rich Wal0 instance using Docker. Our team is working on providing Docker images.

## Tech Stack

Wal0 is built on the following open-source projects:

- [Next.js](https://github.com/vercel/next.js) - React framework
- [Shadcn UI](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) - Utility-first CSS framework
- [Storybook](https://github.com/storybookjs/storybook) - UI component development environment
- [MongoDB](https://github.com/mongodb/mongo) - Document database
- [Mongoose](https://github.com/Automattic/mongoose) - MongoDB object modeling
- [NextAuth.js](https://github.com/nextauthjs/next-auth) - Authentication solution
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation
- [Tanstack Query](https://github.com/tanstack/query) - Frontend request handling library
- [Vercel AI SDK](https://github.com/vercel/ai) - AI model integration

We deeply appreciate these powerful yet simple libraries provided by the community, which allow us to focus more on implementing product logic. We hope our project can also provide an easier-to-use AI component code generation engine for everyone.

