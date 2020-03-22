# build stage
FROM node:10-slim as build-stage
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:10-slim as production-stage
COPY --from=build-stage /usr/src/app /usr/src/app

#serve
EXPOSE 3001
CMD ["node", "server/server.js"]
