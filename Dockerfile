# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port your app runs on (this example uses port 3000)
EXPOSE 3000

# Define the command to run your application
CMD [ "node","-r","newrelic", "handler.js" ]