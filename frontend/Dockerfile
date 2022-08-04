FROM node:16.16-alpine3.15

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN npm install --force

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]
