FROM keymetrics/pm2:18-alpine

ENV NPM_CONFIG_LOGLEVEL warn

RUN apk add --update --no-cache git ca-certificates\
    && update-ca-certificates \
    && apk --update add --no-cache openssl openssh bash \
    && rm -rf /tmp/* /var/cache/apk/*

RUN mkdir ~/.ssh/

COPY ./keys/id_rsa /root/.ssh/id_rsa
COPY ./keys/id_rsa.pub /root/.ssh/id_rsa.pub
COPY ./keys/known_hosts /root/.ssh/known_hosts

RUN chmod 600 /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa.pub
RUN chmod 600 /root/.ssh/known_hosts

ENV HOME=/usr/app
ENV TZ=America/Sao_Paulo

WORKDIR $HOME/webapp

ADD . $HOME/webapp
RUN git clone git@github.com:wstlima/api-rest.git main
RUN cd $HOME/webapp/api-rest && rm -rf node_modules && npm cache clear --force && npm install --no-audit && npm run build && cd ..
RUN npm install --global pm2@latest pm2-logrotate@latest vite cross-env --no-audit
RUN pm2 install pm2-logrotate

EXPOSE 3000 27017 3000 8083 80 5173 8084

CMD [ "pm2-runtime", "start", "pm2.json" ]
