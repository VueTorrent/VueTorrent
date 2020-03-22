# build stage
FROM node:10-slim as build-stage
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -D
COPY . .
RUN npm run build

# production stage
FROM node:10-slim as production-stage
WORKDIR /usr/src/app
COPY --from=build-stage /usr/src/app ./
RUN rm -r node_modules && rm -r src && npm install

#serve
EXPOSE 3001
CMD ["node", "server/server.js"]
