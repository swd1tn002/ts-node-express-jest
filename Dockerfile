FROM node

WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm install

# Copy migrations and seed data
COPY .sequelizerc ./
COPY db ./db

# Migrate database
RUN npm run migrate

# Seed database with initial data
RUN npm run seed

# Copy project to docker
COPY . .

# Build project
RUN npm run build

# Expose port 3000 to host
EXPOSE 3000

# Run the project
CMD ["npm", "start"]
