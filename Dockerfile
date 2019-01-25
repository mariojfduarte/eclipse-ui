FROM node:10.8.0
ENV FORWARDHOST=35.180.155.184 FORWARDPORT=9090
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm audit fix
COPY . . 
EXPOSE 3000
CMD ["npm","run", "serve"]
