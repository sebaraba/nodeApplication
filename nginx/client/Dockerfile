FROM node:14-alpine
WORKDIR "/app"
COPY ./package.json ./
RUN yarn install
RUN yarn build
COPY . .
CMD ["yarn", "start"]