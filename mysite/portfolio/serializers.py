from rest_framework import routers, serializers, viewsets
from .models import Asset
from django.contrib.auth.models import User, Group

class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ['ticker_text',
                  'shares_integer',
                  'costbasis_price',
                  'buy_date',
                  'account',
                  'user']
        
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']