FROM registry.bisnode.net/dbase/server-nodejs8:8.9.6

LABEL maintainer "Nebeolisa Samuel <samuel.nebeolisa@bisnode.com>"

WORKDIR /opt/node/app

USER root

ENV DEBIAN_FRONTEND=noninteractive

RUN \
    apt-get update \
    && apt-get install -y apt-utils build-essential \
    && apt-get install -y g++ aptitude \
    && aptitude -y safe-upgrade

FROM registry.bisnode.net/dbase/server-nodejs8:8.9.6

LABEL maintainer "Nebeolisa Samuel <samuel.nebeolisa@bisnode.com>"

USER root

ENV DEBIAN_FRONTEND=noninteractive

RUN \
    apt-get update \
    && apt-get install -y apt-utils build-essential \
    && apt-get install -y g++ aptitude \
    && aptitude -y safe-upgrade

USER $NODE_USER

RUN npm install -g pm2

COPY ./project /opt/websocket-kata

WORKDIR /opt/websocket-kata

ENTRYPOINT  ["/bin/sh", "-c", "pm2 start /opt/websocket-kata/server/app.js && tail -f /dev/null"]