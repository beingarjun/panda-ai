# Multi-stage build for production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY web/package*.json ./web/

# Install dependencies
RUN npm ci --only=production

# Build the source code
FROM base AS builder
WORKDIR /app

# Copy all files
COPY . .

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/server/node_modules ./server/node_modules
COPY --from=deps /app/web/node_modules ./web/node_modules

# Build the server
RUN cd server && npm run build

# Build the web frontend
RUN cd web && npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/package*.json ./server/
COPY --from=builder /app/web/dist ./web/dist
COPY --from=builder /app/package*.json ./

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/server/node_modules ./server/node_modules

# Create var directory for database
RUN mkdir -p server/var && chown -R nextjs:nodejs server/var

USER nextjs

EXPOSE 8080

ENV PORT 8080

# Start the server
CMD ["node", "server/dist/index.js"]
