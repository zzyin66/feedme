from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

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
    
class User(AbstractUser):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    username = models.CharField(unique=True, max_length=255)
    password = models.CharField()
    email = models.EmailField(unique=True, max_length=255)
    feed_history = models.ManyToManyField(NewsArticle, related_name="feed_history")
    recommendations = models.ManyToManyField(NewsArticle, related_name="recommendations")
    keywords = models.JSONField(null=True, blank=True, default=dict)
    bookmarked = models.ManyToManyField(NewsArticle, related_name="bookmarked")
    
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.username

