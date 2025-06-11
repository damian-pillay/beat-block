# ./frontend/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Copy root and frontend package files
COPY ./package*.json ./

# Install all dependencies using npm workspaces
RUN npm install

# Copy the rest of the monorepo (adjust context if needed)
COPY ./ ./

EXPOSE 5173

CMD ["npm", "run", "dev"]