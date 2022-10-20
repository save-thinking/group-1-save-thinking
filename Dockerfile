# Node 18 is the current LTS version
FROM node:18.11.0

# Make sure we are root
USER root

# Install git
RUN apt-get update && apt-get install -y git

# Remove passwords for user accounts
RUN passwd -d root &> /dev/null
RUN passwd -d node &> /dev/null

# Specify the absolute path to the repository mount point in an environment variable (so it can be changed). Defaults to "/app"
ENV REPOSITORY_PATH /app
WORKDIR ${REPOSITORY_PATH}

# add `/app/node_modules/.bin` to $PATH
ENV PATH $REPOSITORY_PATH/node_modules/.bin:$PATH

# Set the Node environment to "development"
ENV NODE_ENV=development


