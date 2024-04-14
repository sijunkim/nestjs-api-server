FROM node:20-alpine3.19 AS builder
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

FROM node:20-alpine3.19
WORKDIR /app

COPY --from=builder /app ./

CMD ["yarn", "start:dev"]