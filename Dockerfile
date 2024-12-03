# Use Node.js base image
FROM node:18-alpine

# Install build tools for native dependencies
RUN apk add --no-cache make g++ python3

# Set environment variables
ENV PYTHON=/usr/bin/python3
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV npm_config_build_from_source=false

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force && npm install --legacy-peer-deps --build-from-source=false

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]