default: start

start:
	docker-compose up

restart:
	docker-compose exec nodejs pm2 restart APP

stop:
	docker-compose down

pm2:
	docker-compose exec nodejs pm2 $(cmd)

exec:
	docker-compose exec nodejs bash