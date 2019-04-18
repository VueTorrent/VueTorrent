FROM node:10-slim

WORKDIR /app

COPY package.json /app

RUN npm install

COPY server /app

COPY dist /app

EXPOSE 3009

CMD ["npm", "start"]