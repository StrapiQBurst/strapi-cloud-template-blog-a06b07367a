# Use an official Node.js image as the base image
FROM node:18.17.1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install the required dependencies
RUN yarn

# Copy the rest of the app files into the container
COPY . .

# Build the Strapi admin panel
RUN yarn build

# Expose the port Strapi will run on
EXPOSE 1337

# Define the command to start the application
CMD ["yarn", "develop"]
