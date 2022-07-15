FROM node:latest
WORKDIR /usr/src/app
COPY package.json yarn.lock
COPY . .
RUN npm install -g yarn --force
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]