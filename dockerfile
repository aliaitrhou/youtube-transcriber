# Use the official Node.js image as a base
FROM node:14-alpine

# Set the working directory inside the container for Node.js
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory for Node.js
COPY package*.json ./

# Install Node.js dependencies
RUN npm install --production

# Set up Python environment
RUN apk add --no-cache python3 python3-dev py3-pip build-base

# Set the working directory inside the container for Python
WORKDIR /ai-trans/scripts

# Copy requirements.txt to the working directory for Python
COPY /ai-trans/requirements.txt .

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Switch back to the working directory for Node.js
WORKDIR /ai-trans/pages 

# Copy the rest of your Node.js application
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
