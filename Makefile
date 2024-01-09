DB_CONTAINER_NAME=db-container
DB_USER=user
DB_NAME=feedme

WEB_CONTAINER_NAME=web-container

# Connect to the PostgreSQL database
use-db:
	@docker exec -it $(DB_CONTAINER_NAME) psql -U $(DB_USER) -d $(DB_NAME)

# Connect to web container shell
shell:
	@docker exec -it $(WEB_CONTAINER_NAME) bash

# Connect to web container and open up interactive python shell
pyshell:
	@docker exec -it $(WEB_CONTAINER_NAME) python manage.py shell