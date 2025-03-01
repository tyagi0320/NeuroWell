# Use official Node.js image as base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install 

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build 

# Expose the React port
EXPOSE 3000

# Serve the application
CMD ["npm", "start"]
