FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --force

EXPOSE 3000

# COPY . .

CMD [ "npm", "run", "start" ]