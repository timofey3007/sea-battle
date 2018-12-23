FROM keymetrics/pm2:10-stretch

# Instlling dockerize https://hub.docker.com/r/jwilder/dockerize/
RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.5.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
# --------------------------------------------------------------

ENTRYPOINT ["dockerize", "-template", "/usr/app/pm2.json.tmpl:/usr/app/pm2.json"]