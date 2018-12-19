FROM node:10.8.0
ENV FORWARDHOST='0.0.0.0' FORWARDPORT=9090
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 3000
CMD ["npm","build"]
CMD ["npm","start"]
