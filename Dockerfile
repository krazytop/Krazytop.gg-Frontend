# Stage 1: Build the Angular application
FROM node:22.0.0-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build -- --configuration production

# Stage 2: Run the application using Node.js/Express
FROM node:22.0.0-alpine

WORKDIR /app

# Copy the Express server file and the built Angular application
COPY server.js .
COPY --from=build /app/dist/krazytop-front ./dist/krazytop-front

EXPOSE 4200

CMD ["node", "server.js"]
