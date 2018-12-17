FROM node:8-alpine

#Create app directory

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json yarn.lock ./

RUN apk add --no-cache git \
    && yarn install --production --frozen-lockfile \
    && yarn cache clean \
    && apk del git

COPY . .

EXPOSE 3000

CMD ["node", "-r", "esm", "server/index.js"]
