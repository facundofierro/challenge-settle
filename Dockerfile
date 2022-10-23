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
COPY --from=build_stage  /app/dist ./dist
COPY --from=build_stage  /app/package.json ./
RUN yarn install --production

ENV FIXER_API_KEY Q2GZIbgFD3L3YjrXpLShuLRPRimp7ueg
ENV FIXER_URL http://api.apilayer.com/fixer/latest
ENV DEFAULT_FEE 0.01
ENV SERVER_PORT 9000
ENV API_KEY 4MedFfxgfYVNw5no2QChdNYZizpDHMss

EXPOSE 9000

CMD [ "node", "dist/index.js"]
