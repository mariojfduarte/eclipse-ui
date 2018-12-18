FROM node:10.8.0
ENV FORWARDHOST='192.168.5.82' FORWARDPORT=31409
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 3000
CMD ["npm","start"]
