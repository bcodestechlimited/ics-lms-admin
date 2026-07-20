# Step 1: Build the React application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
# You are using --force in your current setup, keeping it here just in case
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the built assets from the builder stage to Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Add a custom Nginx configuration to handle React Router (SPA routing)
RUN echo $'\
server {\n\
    listen 80;\n\
    location / {\n\
        root   /usr/share/nginx/html;\n\
        index  index.html index.htm;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
