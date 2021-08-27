FROM node:14.16.0-alpine

# App directory
WORKDIR /app

# App dependencies
COPY package*.json ./

# Install dependencies.
# If you add a package-lock.json speed your build by switching to 'npm ci'.
RUN npm install

# Copy app source code to the container image
COPY . .

# Run the web service on container startup
CMD ["npm", "run", "start:dev"]
