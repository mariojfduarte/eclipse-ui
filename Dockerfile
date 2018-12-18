FROM node:10.8.0
ENV FORWARDHOST='104.196.24.70' FORWARDPORT=31409
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 3000
CMD ["npm","start"]
