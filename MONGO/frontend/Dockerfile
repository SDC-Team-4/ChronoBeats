# Pick an image to use
FROM node:18

# Tell docker what to name the container's internal folder
WORKDIR /frontend

# Copy over package files, so that npm knows that modules to download
COPY package*.json ./

# RUN tells docker what command to run internally on creation.
RUN npm install

# Copy over all other files.
COPY . .

# Expose this port from within docker to the outside world! (the rest of your computer)
EXPOSE 9000

# CMD tells docker what to run on startup
CMD npm run pro