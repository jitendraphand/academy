FROM node:24-alpine
RUN apk add --no-cache sqlite
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY . .
RUN mkdir -p data
ENV PORT=3000 DB_PATH=/app/data/academy.db
EXPOSE 3000
VOLUME ["/app/data"]
CMD ["node", "server.js"]
