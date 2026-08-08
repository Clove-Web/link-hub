# info/Dockerfile
# Copyright (c) 2026 Clove Nytrix Doughmination Twilight
# Licensed under the DASL-1.0 Licence.
# See LICENCE.md in the project root for full licence information.
FROM oven/bun:1 AS base
WORKDIR /app

# ---- Dependencies (cached unless package.json / bun.lock change) ----
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ---- Build ----
FROM node:25-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Runtime ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=4020
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER bun

EXPOSE 4020
CMD ["bun", "server.js"]
