from django.contrib.auth.models import User, Group
from rest_framework import serializers
from stock.models import PriceHistory
from stock.models import SymbolList
from stock.models import WatchList

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceHistory
        fields = ['id', 'symbol', 'volume', 'high', 'low', 'open', 'datetime', 'close']

class SymbolSerializer(serializers.ModelSerializer):
    class Meta:
        model = SymbolList
        fields = ['id', 'symbol']

class WatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchList
        fields = ['id', 'symbol']