FROM node:lts-slim
WORKDIR /usr/src/app
ENV NODE_ENV production
ENV PORT 8080
COPY package.json ./
# gcc linux-headers libgcc libstdc++ g++ 
RUN apt-get update -y
RUN apt-get install -y g++ make python3
RUN apt-get autoremove -y
RUN apt-get clean -y
RUN apt-get autoclean -y
RUN rm -rf /var/lib/apt/lists/*
RUN npm install -g npm
RUN npm install node-gyp -g
RUN npm install
COPY . .
RUN npm run build:prod
EXPOSE 8080
CMD [ "npm" , "run", "start" ]