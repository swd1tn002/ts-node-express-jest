FROM node

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project to docker
COPY . .

# Build project
RUN npm run build

# Migrate database
RUN npm run migrate

# Seed database with initial data
RUN npm run seed

# Expose port 3000 to host
EXPOSE 3000

# Run the project
CMD ["npm", "start"]
