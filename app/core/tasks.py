from celery import shared_task
from .helpers.scraper import scrape_news

@shared_task
def scrape_news_task():
    scrape_news()
