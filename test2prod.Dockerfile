FROM node:22-alpine AS base
# مرحله نصب وابستگی‌ها
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json ./

# Clear cache and update npm to the latest version
RUN npm config set registry http://registry.npmjs.org/
RUN npm cache clean --force && npm install -g npm@latest && npm install --force

# مرحله ساخت برنامه
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build  # خروجی standalone ساخته می‌شود

# Inspect the .next directory to ensure it exists
RUN ls -la /app/.next

# مرحله اجرای محصول
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
USER node
EXPOSE 3001
CMD ["node", "server.js"]
