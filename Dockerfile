# Сайт + функция api/lead.js в одном контейнере (запуск на своём сервере, см. compose.yaml).
# На Vercel этот файл не используется. Зависимостей нет: только Node.js.
ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production PORT=3000 ROOT=/app
COPY --chown=node:node . .
USER node
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:3000/__health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"
CMD ["node", "server/index.cjs"]
