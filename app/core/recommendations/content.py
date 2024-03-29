from ..models import NewsArticle, User
from datetime import date, timedelta
import random

def generate_content_recommendations(id):
    try:
        user = User.objects.get(id=id)
        
        today = date.today()
        date_minimum = today - timedelta(days=1)
        feed_history = user.feed_history.all()
        read_feed_ids = [feed.id for feed in feed_history]
        print(read_feed_ids)
        if not user.keywords or len(read_feed_ids) < 5:
            # user as not associated keywords
            # recommend 2 articles from each category
            print("generating default recommendations")
            recommendations = []
            categories = ["world", "nation", "business", "technology", "entertainment", "science", "sports", "health"]
            for category in categories:
                recommendations.extend(list(NewsArticle.objects.filter(date__gte=date_minimum, category=category).exclude(id__in=read_feed_ids)[:3]))
            random.shuffle(recommendations)
            return [feed.id for feed in recommendations]
        
        #getting all news feeds that the user has not read
        feeds = NewsArticle.objects.filter(date__gte=date_minimum).exclude(id__in=read_feed_ids)
        
        #getting the user's keywords
        user_keywords = user.keywords
        
        feed_dict = {}
        for feed in feeds:
            feed_keywords = feed.keywords

            feed_score = 0
            for key in feed_keywords.keys():
                if key in user_keywords.keys():
                    feed_score += (float(feed_keywords[key]) * float(user_keywords[key]))        
            feed_dict[feed.id] = feed_score
        
        
        feed_dict = dict(sorted(feed_dict.items(), key=lambda x: x[1], reverse=True))    
        
        recommendations = list(feed_dict.keys())[:15]
        
        return recommendations
    
    except:
        return 