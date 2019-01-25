FROM node:10.8.0
ENV PORT=3000 FORWARDHOST='35.180.155.184' FORWARDPORT=9090 NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 3000
CMD ["node","server-prod.js"]
