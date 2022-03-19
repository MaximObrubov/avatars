FROM node:17.7.2

# DO NOT perform any action from root user
RUN groupadd -r avuser && useradd -r -g avuser avuser

RUN npm install && npm run build
WORKDIR /app
COPY app /app
COPY cmd.sh /app/

EXPOSE 9090 9091
USER avuser

CMD ["./cmd.sh"]