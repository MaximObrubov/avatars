bash:
	docker exec -it serv_container /bin/bash
start:
	docker-compose up --build
stop:
	docker-compose down

