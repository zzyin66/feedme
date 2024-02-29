from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

urlpatterns = [
    path('recommendations/', views.Recommendations.as_view()),
    path('mark_read/', views.MarkArticle.as_view()),
    path('register/', views.Register.as_view()),
    path('user/', views.UserView.as_view()),
    path('logout/', views.Logout.as_view()),
    path('feeds/', views.Newsfeed.as_view()),
    path('token/',
         jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
    path('bookmarks/', views.BookmarkView.as_view(), name='bookmarks'),
]
