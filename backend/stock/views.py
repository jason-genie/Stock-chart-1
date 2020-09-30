from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import UserSerializer, GroupSerializer, SymbolSerializer, StockSerializer, WatchSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from stock.models import PriceHistory
from stock.models import SymbolList
from stock.models import WatchList
from django.http import JsonResponse
import requests
import json
from django.db.models import Q

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    
    @api_view(('GET',))
    # @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
    def list(self):
        factory = APIRequestFactory()
        request = factory.get('/')

        serializer_context = {
            'request': Request(request),
        }
        queryset = User.objects.all()
        serializer = UserSerializer(instance=queryset, context=serializer_context, many=True)
        return Response(serializer.data)

    @api_view(['POST'])
    def current_user(request):
        queryset = User.objects.get(username=request.data['username'])
        serializer = UserSerializer(queryset)
        return Response(serializer.data)

    @api_view(['POST'])
    def update_user(request):
        queryset = User.objects.get(id=request.data['userId'])
        queryset.username = request.data['username']
        queryset.email = request.data['email']
        queryset.first_name = request.data['firstname']
        queryset.last_name = request.data['lastname']
        queryset.set_password(request.data['password'])
        queryset.save()
        return Response()

    def retrieve(self, request):
        queryset = User.objects.all()
        user = get_object_or_404(queryset)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class StockViewSet():
    
    @api_view(('GET',))
    def addPriceHistory(self):
        res = requests.get('https://api.iextrading.com/1.0/ref-data/symbols')
        data = res.json()

        for d in data:
            symbolName = d['symbol']
            historyData = requests.get(f'https://api.tdameritrade.com/v1/marketdata/{symbolName}/pricehistory?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&periodType=year&period=1&frequencyType=daily&frequency=1')
            history = historyData.json()
            candles = history['candles']
            if(len(candles)>1):
                for candle in candles:
                    # print(symbolName, candle['volume'])
                    price  = PriceHistory(
                        symbol = symbolName,
                        volume = candle['volume'],
                        high = candle['high'],
                        low = candle['low'],
                        open = candle['open'],
                        datetime = candle['datetime'],
                        close = candle['close']
                    )
                    price.save()
                
        return Response()

    @api_view(('GET',))
    def addSymbolList(self):
        res = requests.get('https://api.iextrading.com/1.0/ref-data/symbols')
        data = res.json()

        for d in data:
            symbolName = d['symbol']

            symList  = SymbolList(
                symbol = symbolName,
            )
            symList.save()
                
        return Response()

    @api_view(['POST'])
    def addSymbol(request):
        symbolName = request.data['symbol']
        queryset1 = SymbolList.objects.filter(Q(symbol=symbolName)).distinct()
        if queryset1:
            print("exist")
        else:
            symbol = SymbolList(
                symbol = request.data['symbol']
            )
            symbol.save()

        queryset2 = WatchList.objects.filter(Q(symbol=symbolName)).distinct()
        if queryset2:
            print("exist")
        else:
            watch = WatchList(
                symbol = request.data['symbol']
            )
            watch.save()

        # newSymbol = PriceHistory(
        #     symbol = request.data['symbol'],
        #     volume = request.data['volume'],
        #     high = request.data['high'],
        #     low = request.data['low'],
        #     open = request.data['open'],
        #     datetime = request.data['datetime'],
        # )

        # newSymbol.save()
        return Response()

    @api_view(('GET',))
    def getSymbolList(self):
        factory = APIRequestFactory()
        request = factory.get('/')

        serializer_context = {
            'request': Request(request),
        }
        queryset = SymbolList.objects.all()
        serializer = SymbolSerializer(instance=queryset, context=serializer_context, many=True)
        return Response(serializer.data)

    @api_view(('GET',))
    def getWatchList(self):
        factory = APIRequestFactory()
        request = factory.get('/')

        serializer_context = {
            'request': Request(request),
        }
        queryset = WatchList.objects.all()
        serializer = WatchSerializer(instance=queryset, context=serializer_context, many=True)
        return Response(serializer.data)

    @api_view(['POST'])
    def deleteSymbol(request):
        WatchList.objects.filter(Q(symbol=request.data['symbol'])).delete()
        return Response()

    @api_view(('GET',))
    def getStockScreen(request):
        limit = int(request.GET['limit'])
        offset = 0 + (int(request.GET['page']) - 1 ) * limit
        end = int(request.GET['page']) * limit
        serializer_context = {
            'request': request,
        }
        symbolname = request.GET['search']

        method = request.GET['method']

        d = 'volume'
        if method == '0':
            d = '(close - open)/open'
        elif method == '1':
            d = 'volume'
        elif method == '2':
            d = '(open - close)/(open+1)'
        elif method == '3':
            d = '(open - close)/(open-1)'
        
        print("method: ", method, d)

        if symbolname != '':
            queryset = PriceHistory.objects.extra(select={'diff': d}).order_by('datetime', 'diff').filter(Q(symbol=symbolname))[offset:end]
        else:
            queryset = PriceHistory.objects.extra(select={'diff': d}).order_by('datetime', 'diff')[offset:end]
        serializer = StockSerializer(instance=queryset, context=serializer_context, many=True)
        return Response(serializer.data)
    
    @api_view(('GET',))
    def getTotalRecords(request):
        symbolname = request.GET['search']

        if symbolname != '':
            queryset = PriceHistory.objects.filter(Q(symbol=symbolname)).count()
        else:
            queryset = PriceHistory.objects.all().count()

        return Response(queryset)


    



