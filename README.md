# Sea Battle

Famous simple game, which does not needed in explanations. But in this game were added some short videos to make it more funny.

For locally development you can run next commands:

- ```make``` or ```make start``` - application will be built via docker-compose;
- ```make stop``` - will stop and kill all working application containers;
- ```make restart``` - mostly it needed for developing, when you don't want to stopping and starting nodejs container. Just will restarts pm2 application server;
- ```make pm2 cmd=(pm2 command)``` - in cases when you want to run any command of [pm2 package](http://pm2.keymetrics.io/docs/usage/cluster-mode/);
- ```make exec``` - passing inside of nodejs container.

Application will use next ports:
- 80 - this application;
- 8080 - mongo-express container to monitoring mongo db container.
