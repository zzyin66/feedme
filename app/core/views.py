from django.shortcuts import render
from django.http import HttpResponse
from .models import User, NewsArticle
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .recommendations.hybrid import hybrid_recommendations
from .serializers import UserSerializer, NewsArticleSerializer
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
import jwt
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

class Recommendations(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        token_user_email = request.user.email
        
        user = User.objects.get(email=token_user_email)
        
        if not user:
            raise User.DoesNotExist
        
        hybrid_recommendations(user.id)
        recommendations = user.recommendations.all()
        
        serializer = NewsArticleSerializer(recommendations, many=True)
        
        return Response(serializer.data)

class MarkArticle(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        token_user_email = request.user.email
        feed_id = request.data['feed_id']
        
        try:
            user = User.objects.get(email=token_user_email)
            if user.feed_history.filter(id=feed_id).exists():
                return Response("article read!")
            feed = NewsArticle.objects.get(id=feed_id)
            user_keywords = user.keywords
            feed_keywords = feed.keywords
            
            updated_keywords = user_keywords.copy()
            
            for key, value in feed_keywords.items():
                if key in updated_keywords:
                    key_value = updated_keywords[key]
                    updated_keywords[key] += float(value) + float(key_value)
                else:
                    updated_keywords[key] = float(value)   

            
            user.keywords = updated_keywords
            user.feed_history.add(feed_id)
            user.save()
        except:
            pass    
        return Response("article read!")

class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data)

class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        token_user_email = request.user.email
        
        user = User.objects.get(email=token_user_email)
        serializer = UserSerializer(user)
        
        return Response(serializer.data)
    
class Logout(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class Newsfeed(ListAPIView):
    pagination_class = PageNumberPagination
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        category = self.request.query_params.get('category')
        newsfeed = NewsArticle.objects.filter(category=category).order_by('-date')
        if not newsfeed:
            raise NotFound('No newsfeed found for the specified category')

        return newsfeed

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        serializer = NewsArticleSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)
        