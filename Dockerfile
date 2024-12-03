# Use an official Node.js base image
FROM node:18-alpine

# Install Python 3
RUN apk add --no-cache python3 py3-pip

# Ensure 'python' command points to Python 3
RUN ln -sf python3 /usr/bin/python

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

RUN npm install --legacy-peer-deps
# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]