FROM node:8 as react-build

# Working directory for the docker image
WORKDIR /app

# Copy all the contents of this directory into the image
COPY . ./

# Build the react app
RUN yarn
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]