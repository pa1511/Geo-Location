FROM node:18.19.1-slim

# Install dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Copy all source code to the working directory
RUN mkdir /usr/src/app/src
COPY /src /usr/src/app/src
WORKDIR /usr/src/app/src

# Command to run the application
CMD ["node", "index.js"]