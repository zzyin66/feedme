from django.db import models

class NewsArticle(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField()
    date = models.DateTimeField()
    url = models.URLField(unique=True)
    category = models.CharField(max_length=100)
    keywords = models.JSONField()

    def __str__(self):
        return self.title

