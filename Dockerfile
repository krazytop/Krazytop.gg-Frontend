# Stage 1: Build the Angular application
FROM node:22.0.0-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build -- --configuration production

# Stage 2: Exécute l'application Node.js/Express (l'image finale, allégée)
FROM node:22.0.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY server.js .

COPY --from=build /app/dist/frontend ./dist/frontend

EXPOSE 4200

CMD ["node", "server.js"]
