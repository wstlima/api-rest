
FROM node:18-alpine

ENV NPM_CONFIG_LOGLEVEL warn

RUN apk add --update --no-cache git ca-certificates \
    && update-ca-certificates \
    && apk --update add --no-cache openssl openssh bash    \
    && rm -rf /tmp/* /var/cache/apk/*


# RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
# RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
# RUN apk update
# RUN apk add mongodb
# RUN apk add mongodb-tools
# RUN mkdir -p /data/db/
# RUN chown root:root /data/db



RUN mkdir ~/.ssh/


COPY ./keys/id_rsa /root/.ssh/id_rsa
COPY ./keys/id_rsa.pub /root/.ssh/id_rsa.pub
COPY ./keys/known_hosts /root/.ssh/known_hosts

RUN chmod 600 /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa.pub
RUN chmod 600 /root/.ssh/known_hosts
# RUN git remote set-url origin git@github.com:wstlima/api-rest.git
# RUN git config --global --add safe.directory /home/app

# ENV HOME=/home/app
# ENV TZ=America/Sao_Paulo

WORKDIR /usr/app
RUN mkdir api-rest
ADD . ./api-rest
# ADD ./.env ./api-rest/.env
ADD ./pm2.json ./pm2.json

# RUN rm -rf api-rest
# RUN git clone git@github.com:wstlima/api-rest.git 
RUN cd /usr/app/api-rest  && npm install --no-audit && npm run build && cd ..
RUN npm install --global pm2@latest pm2-logrotate@latest vite cross-env --no-audit
RUN pm2 install pm2-logrotate

EXPOSE 3000 27017 3000 8083 80 5173 8084

CMD [ "pm2-runtime", "start", "pm2.json" ]
