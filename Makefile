default: start

start:
	docker-compose up

restart:
	docker-compose exec nodejs pm2 restart APP

watch:
	docker-compose exec nodejs npm run watch

stop:
	docker-compose down

pm2:
	docker-compose exec nodejs pm2 $(cmd)

exec:
	docker-compose exec nodejs bash