FROM node:17.7.2

COPY package.json tsconfig.build.json tsconfig.json cmd.sh /home/node/app/
RUN chown -R node:node /home/node

EXPOSE 3000
USER node
WORKDIR /home/node/app/
RUN npm install

CMD ["./cmd.sh"]
