from rest_framework import serializers
from .models import NewsArticle, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'keywords', 'preferences', 'daily_email_opt_in']
        extra_kwargs = {
            'password': {'write_only': True},
            'keywords': {'required': False}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'preferences', 'daily_email_opt_in')

class NewsArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsArticle
        fields = ['id', 'description', 'title', 'url', 'date', 'image', 'category']
        extra_kwargs = {
            'keywords': {'required': False}
        }