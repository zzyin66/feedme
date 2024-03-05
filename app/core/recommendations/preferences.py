from ..models import NewsArticle, User
from datetime import date, timedelta
import random

def generate_preference_recommendations(id):
    try:
        user = User.objects.get(id=id)
        
        today = date.today()
        date_minimum = today - timedelta(days=1)
        feed_history = user.feed_history.all()
        read_feed_ids = [feed.id for feed in feed_history]
        feeds = NewsArticle.objects.filter(date__gte=date_minimum).exclude(id__in=read_feed_ids)

        recommendations = []
        preferences = user.preferences.keys()
        for preference in preferences:
            preference_feed = feeds.filter(title__icontains=preference).first()
            if preference_feed:
                recommendations.append(preference_feed.id)
        #getting all news feeds that the user has not read

        

        return recommendations
    
    except:
        return 