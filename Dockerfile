FROM node:8.7.0

# There is a better way to do this:
# https://hackernoon.com/using-yarn-with-docker-c116ad289d56

# Create app directory
WORKDIR /home/bonfire
ADD package.json .

# Install app dependencies
COPY package.json yarn.lock /home/bonefire/
RUN npm install -g yarn
RUN yarn install

# Bundle app source
COPY . .

EXPOSE 8080
ENTRYPOINT [ "npm", "run", "start" ]