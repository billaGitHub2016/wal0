# 贡献指南

欢迎来到 Compoder 贡献指南！作为 AI 驱动的组件代码生成引擎，我们致力于为前端工程师提供最佳的组件代码生成体验，提供基于多种技术栈、组件库、AI 模型、以及多种场景的代码生成器。您的每一份贡献都意义非凡。

## issue 管理

[查找](https://github.com/IamLiuLv/compoder/issues?q=is:issue+is:open)现有 issue 或[新建](https://github.com/IamLiuLv/compoder/issues/new/choose)issue。

### 如何新建 issue？

**1. 功能 issue**

请详细说明 issue 的功能目标实现，为什么需要这个功能，带来的价值是什么。

**2. 其他类型 issue（BUG 报告、性能优化、UI 优化、文档修正等）**

- 针对 BUG 报告：请详细说明问题描述、复现步骤等，并提供相关截图或视频
- 针对性能优化：请说明优化前后的性能对比，并提供相关截图或视频
- 针对 UI 优化：请说明 UI 优化前后的对比，并提供相关截图或视频
- 针对文档修正：请说明文档修正的内容、原因等

### 如何认领 issue？

请基于 issue 的描述，认领感兴趣的 issue 并开始编码并提交与 issue 关联的 PR，可能会有其他开发者也认领了同一个 issue，但是没关系，我们鼓励大家一起参与，互相学习，共同进步。

## 环境搭建

### 1. 环境准备

- [Node.js](https://nodejs.org/) v18.x 或更高版本
- [pnpm](https://pnpm.io/) v9.x 或更高版本
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 2. Fork 仓库

访问 [Compoder GitHub 仓库](https://github.com/IamLiuLv/compoder)，点击右上角的 "Fork" 按钮创建一个属于您自己的仓库副本。

### 3. 克隆仓库

```bash
# 克隆您 fork 的仓库
git clone git@github.com:<github_用户名>/compoder.git
cd compoder

# 安装依赖
pnpm install
```

### 4. 启动 Docker 容器

```bash
# docker 配置
cp docker-compose.template.yml docker-compose.yml

# 启动 MongoDB 数据库
docker compose up -d
```

### 5. 环境变量与配置

```bash
# 填写对应的环境变量
cp .env.template .env

# Model provider 配置（需要更换其中的 BaseUrl、API Key）
cp data/config.template.json data/config.json

# Codegen 配置初始化
cp data/codegens.template.json data/codegens.json
pnpm migrate-codegen
```

### 6. 启动开发服务

```bash
# 启动 Compoder
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000/) 开始开发

### 7. 启动 Storybook 业务组件文档（可选）

```bash
pnpm storybook
```

### 8. 启动代码渲染沙箱（按需启动）

```bash
# 启动 Antd 渲染沙箱
cd artifacts/antd-renderer
pnpm dev

# 启动 Shadcn UI 渲染沙箱
cd artifacts/shadcn-ui-renderer
pnpm dev

# 启动 Mui 渲染沙箱
cd artifacts/mui-renderer
pnpm dev

# 启动 Element Plus 渲染沙箱
cd artifacts/element-plus-renderer
pnpm dev
```

## 项目结构

### 主要目录结构

```text
[app/]                    // Next.js 应用主目录
├── main/                // 主界面相关页面
├── commons/            // 公共对接层组件
├── api/                // API 路由
├── services/           // 服务相关
└── layout.tsx          // 主布局组件

[components/]            // 组件目录
├── biz/                // 业务组件
├── ui/                 // UI 基础组件
└── provider/           // 上下文提供者组件

[lib/]                   // 核心库
├── auth/               // 认证相关
├── config/             // 配置相关
├── db/                 // 数据库相关
└── xml-message-parser/ // XML 解析工具

[artifacts/]             // 代码渲染沙箱环境
├── antd-renderer/      // Antd 渲染环境
├── shadcn-ui-renderer/ // Shadcn UI 渲染环境
├── mui-renderer/       // MUI 渲染环境
└── element-plus-renderer/ // Element Plus 渲染环境
```

## 提交 PR

准备就绪后：

1. 确保代码符合规范
   - 使用 ESLint 和 Prettier 保持代码风格
   - 遵循 TypeScript 类型规范
2. 补充必要测试用例

   - 对于新功能，添加相应的单元测试或集成测试
   - 确保已有测试能够通过

3. 更新相关文档

   - 如果修改了 API 或添加新功能，确保更新相关文档
   - 对于重大变更，在 PR 描述中详细说明

4. 向 main 分支发起 PR
   - PR 标题应简明扼要地描述变更内容
   - PR 描述应包含详细的变更说明、相关 issue 链接等

PR 合并后，您将荣登项目[贡献者名单](https://github.com/IamLiuLv/compoder/graphs/contributors)。

## 代码生成命令

Compoder 提供了基于 Cursor 的多种代码生成命令，便于快速创建各类组件和服务：

```bash
# 生成业务组件
compoder generate:biz-component

# 生成页面集成
compoder generate:page-integration

# 生成 API 请求服务
compoder generate:services

# 生成 SQL & API
compoder generate:sql-api

# 重构业务组件
compoder refactor:bizcomponent
```

在 Cursor 的 chat agent 中输入上述命令，并传递对应的上下文和需求，即可生成对应的代码。

## 获取帮助

遇到问题时可：

- 加入 [GitHub Discussions](https://github.com/IamLiuLv/compoder/discussions) 社区
- 在 [GitHub Issues](https://github.com/IamLiuLv/compoder/issues) 中提问
- 加入社区，扫描下方二维码，添加微信好友，备注：Compoder，拉你进入 Compoder 社区，在社区中和一群志同道合的小伙伴一起交流学习。

<img src="./assets/wechat.png" alt="compoder" width="100px">
