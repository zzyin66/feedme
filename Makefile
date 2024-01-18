DB_CONTAINER_NAME=db-container
DB_USER=user
DB_NAME=feedme
VENV_DIR=./app/env
WEB_CONTAINER_NAME=web-container

# Connect to the PostgreSQL database
db:
	@docker exec -it $(DB_CONTAINER_NAME) psql -U $(DB_USER) -d $(DB_NAME)

# Connect to web container shell
shell:
	@docker exec -it $(WEB_CONTAINER_NAME) bash

# Connect to web container and open up interactive python shell
pyshell:
	@docker exec -it $(WEB_CONTAINER_NAME) python manage.py shell

# Initialize and activate python virtual environment
pyenv:
	@if [ ! -d "$(VENV_DIR)" ]; then \
		echo "Creating virtual environment..."; \
		python3 -m venv $(VENV_DIR); \
	fi
	@echo "Activating virtual environment..."
	@. $(VENV_DIR)/bin/activate

# Run the scraper
scrape:
	@docker exec -it $(WEB_CONTAINER_NAME) python manage.py shell -c "from core.tasks import scrape_news_task; scrape_news_task()"
	