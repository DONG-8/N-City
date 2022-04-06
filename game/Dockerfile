FROM node:16.13.2 as build-stage

ENV PORT 2567
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 2567
CMD [ "npm", "start" ]
