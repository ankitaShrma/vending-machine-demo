# Set the base image to Node
FROM node:14.18.0-alpine

# Define working directory
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8080
CMD ["node", "./src/app.js"]