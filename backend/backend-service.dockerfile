# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /app/backend

# Copy package.json and install dependencies
COPY package*.json ./
COPY tsconfig*.json ./
COPY .env ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build TypeScript
# RUN npm run build

# Expose port
EXPOSE 3000

# Start server
# CMD ["node", "dist/index.js"]
CMD ["npm", "run", "serve"]
