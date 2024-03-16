FROM node:alpine3.16 as build

# Install dependencies
WORKDIR /app/

COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps

# Build application
COPY .env.prod .env
COPY public ./public
COPY src ./src

RUN npm run build

# =============================================
# Second image - nginx to serve the app
FROM nginx:mainline-alpine-slim

# Copy app and server config
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Command to run the application
CMD ["nginx", "-g", "daemon off;"]