# Build stage
FROM --platform=linux/amd64 node:18.9.1 as build_stage
WORKDIR /app
COPY package.json ./
COPY src ./src
COPY tsconfig.json ./tsconfig.json
RUN yarn
RUN yarn build

# Production
FROM --platform=linux/amd64 node:current-alpine3.15
WORKDIR /app
COPY --from=build_stage  /app/dist ./
RUN yarn install --production

EXPOSE 9000

CMD [ "node", "src/index.js"]
