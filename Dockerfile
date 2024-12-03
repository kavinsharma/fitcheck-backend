# Use Node.js base image
FROM node:18-alpine

# Install build tools for native dependencies
RUN apk add --no-cache python3 make g++ 

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force && npm install --legacy-peer-deps --force

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]