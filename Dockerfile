# --------- Base Stage -----------
FROM ubuntu:22.04 AS base
WORKDIR /app

# 设置时区和语言环境
ENV TZ=Asia/Shanghai
ENV LANG=C.UTF-8

# 设置非交互式安装
ARG DEBIAN_FRONTEND=noninteractive

# 更新软件源地址
RUN sed -i 's/ports.ubuntu.com/archive.ubuntu.com/g' /etc/apt/sources.list

# 更新包列表
RUN apt-get update

# 安装基础工具包
RUN apt-get install -y \
    curl \
    ca-certificates \
    gnupg \
    qemu-user-static \
    binfmt-support

# 安装 Node.js 18.x
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs

# 清理缓存
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*

# 安装 pnpm
RUN npm install -g pnpm@9.8.0

# --------- Dependencies Installation Stage -----------
FROM base AS deps

# 复制依赖清单
COPY package.json pnpm-lock.yaml* ./

# 检查 lockfile 是否存在
RUN [ -f pnpm-lock.yaml ] || (echo "Lockfile not found." && exit 1)

# 安装依赖
RUN pnpm install --frozen-lockfile

# --------- Build Stage -----------
FROM base AS builder

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建应用
RUN pnpm build

# --------- Runtime Stage -----------
FROM ubuntu:22.04 AS runner
WORKDIR /app

# 设置时区和语言环境
ENV TZ=Asia/Shanghai
ENV LANG=C.UTF-8

# 设置非交互式安装
ARG DEBIAN_FRONTEND=noninteractive

# 安装必要的运行时依赖
RUN sed -i 's/ports.ubuntu.com/archive.ubuntu.com/g' /etc/apt/sources.list && \
    apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gnupg \
    qemu-user-static \
    binfmt-support \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get update && apt-get install -y \
    nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 创建非 root 用户
RUN useradd -r -u 1001 -g 0 appuser

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder --chown=appuser:root /app/.next/standalone ./
COPY --from=builder --chown=appuser:root /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/data ./data

# 复制并安装 Sui 客户端
COPY public/sui-mainnet-v1.48.2-ubuntu-x86_64.tgz /tmp/
RUN cd /tmp \
    && tar xzf sui-mainnet-v1.48.2-ubuntu-x86_64.tgz \
    && mv sui /usr/local/bin/ \
    && rm sui-mainnet-v1.48.2-ubuntu-x86_64.tgz

# 设置环境变量
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV PATH="/usr/local/bin:${PATH}"

# 创建并设置 Sui 配置目录
RUN mkdir -p /home/appuser/.sui/sui_config \
    && chown -R appuser:root /home/appuser/.sui

USER appuser

# 注册QEMU二进制格式
RUN docker-qemu-user-static --reset -p yes || echo "QEMU registration skipped in container"

# 导入钱包私钥
RUN sui keytool import suiprivkey1qr0x4lyx05rnhuqk9kdcvqew2a36enp55gtsuppadptn3ek22jgp7yg5lyu ed25519

EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# 启动应用
CMD ["node", "server.js"]