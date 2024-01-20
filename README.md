# Feed me

How to set up your macbook to read the news (very easy)

## Run Locally

Clone the project

```bash
git clone git@github.com:zzyin66/feedme.git
```

Make sure you're in project root, and intialize/activate python virtual env (there's a make command for it)

```bash
make pyenv
```

Have this thing installed

- Docker

Update local permissions to run docker entrypoint script (should only need to be ran once)

```bash
chmod +x app/entrypoint.sh
```

Build the image

```bash
docker compose build
```

Start the server

```bash
docker compose up
```

DO NOT RUN!!! I made a mistake setting up the volume, it might be annonymouse -> will nuke your images on compose down.
Unless you want to re-run the scraper each time you spool up containers, just ctrl-c please.

```bash
docker compose down
```

If db containers have no realations, it's probably b/c you need to apply migrations

```bash
make shell
>> python manage.py makemigrations
>> python manage.py migrate
```

Frontend

```bash
cd client
npm i
npm start
```

## Makefile

I wrote a Makefile with some useful commands so we can type less. Make sure you're in project root when you run this stuff.

- This one connects you to the postgres db so you can mess with the tables.

```bash
make db

#show all tables
>> \dt

#show table details
>> \d <your table name>
>> SELECT * FROM ...;
```

- This opens up an interactive shell for you that's already attached to the web container, this is where you would run most of your commands.

```bash
make shell
>> python manage.py ...
>> pip install '56 Chepstow close London ontario'
```

- This opens up a python shell within the web container, this is where you'd run actual python code.

```bash
make pyshell
>> print("IvYsAuR")
```

- This runs the scraper for you, basically opens up a pyshell and executes scraper commands for you.

```bash
make scrape
```

## Seeding your database / running scraper

We don't have a seed script yet, so for now your only option to populate your db is to run the scraper. (takes maybe 10 minutes)

By the way we use celery for tasks, it also runs in a container so you don't have to install anything.

Run the server

```bash
docker compose up
```

Run the scraper from project root. (Where makefile is located).

```bash
make scrape
```

You should check your docker logs in your terminal if you didn't run it detached. Otherwise go to your docker dashboard and check the celery container. There should be articles scraped every few seconds so if it worked you should see logs.

## Migrations

Yeah I'm not sure if I set up docker volume properly so that migrations are applied to db, but whenever you change a model -> shell into container and
makemigrations -> migrate.

```bash
make shell
>> python manage.py makemigrations
>> python manage.py migrate
```

## Installing things/packages

Remember to activate your virtual environment kids!

```bash
make shell
>> pip install [56 Chepstow close London ontario]
>> exit
```

Also please be a kind gentleman and add your install packages to `requirements.txt`.
