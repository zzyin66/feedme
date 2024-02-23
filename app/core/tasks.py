from celery import shared_task
from .helpers.scraper import scrape_news
from .email.send_emails import send_emails
from .models import User

@shared_task
def scrape_news_task():
    scrape_news()

@shared_task
def send_emails_task():
    users = User.objects.all()
    for user in users:
        send_emails(user)