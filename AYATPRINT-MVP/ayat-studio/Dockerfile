FROM node:20-alpine

WORKDIR /app

# Copy from root project (the existing React app IS the Studio)
COPY package.json bun.lock* package-lock.json* ./
RUN npm install --legacy-peer-deps 2>/dev/null || npm install

COPY . .

EXPOSE 5173
ENV VITE_API_URL=http://localhost:3002

CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "5173"]
