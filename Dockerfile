# Use a base image that includes both Python 3.12 and Node.js 18
FROM nikolaik/python-nodejs:python3.12-nodejs18

# Set environment variables to ensure 'python' and 'python3' point to Python 3
RUN ln -sf /usr/bin/python3 /usr/bin/python

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]