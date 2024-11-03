FROM node:20.18-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN rm -rf ./dist

RUN npm run build

FROM amazon/aws-cli

WORKDIR /app

COPY --from=build /app/dist ./dist

# CMD ["s3", "rm", "s3://cuongnq-s3-learning", "--recursive", ";", "s3", "sync", "./dist", "s3://cuongnq-s3-learning", "--exact-timestamps", "--delete"]
# CMD ["s3", "rm", "s3://cuongnq-s3-learning", "--recursive"]
# CMD ["s3", "sync", "/app/dist", "s3://cuongnq-s3-learning", "--exact-timestamps"]
CMD ["s3", "sync", "/app/dist", "s3://cuongnq-s3-learning", "--debug", "--exact-timestamps"]