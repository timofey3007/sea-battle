



default: start

start:


	docker-compose up

restart:
    docker-compose exec pm2

stop:
	docker-compose down

exec:
	docker-compose exec nodejs bash