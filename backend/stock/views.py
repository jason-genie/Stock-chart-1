from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import UserSerializer, GroupSerializer, SymbolSerializer, StockSerializer, WatchSerializer, PortfolioSerializer, PortfolioSymbolSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from stock.models import PriceHistory, HourlyPriceHistory, DailyPriceHistory, WeeklyPriceHistory, MonthlyPriceHistory, PortfolioList, PortfolioSymbolList
from stock.models import SymbolList
from stock.models import WatchList
from django.http import JsonResponse
import requests
import json
from django.db.models import Q
from datetime import datetime
from time import time

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
            HourlyhistoryData = requests.get(f'https://api.tdameritrade.com/v1/marketdata/{symbolName}/pricehistory?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&periodType=day&period=10&frequencyType=minute&frequency=30')
            hourlyhistory = HourlyhistoryData.json()
            print(hourlyhistory)
            if 'candles' in hourlyhistory.keys() :
                hourlycandles = hourlyhistory['candles']
                if(len(hourlycandles)>1):
                    for candle in hourlycandles:
                        # print(symbolName, candle['volume'])
                        hourlyprice  = HourlyPriceHistory(
                            symbol = symbolName,
                            volume = candle['volume'],
                            high = candle['high'],
                            low = candle['low'],
                            open = candle['open'],
                            datetime = candle['datetime'],
                            close = candle['close']
                        )
                        hourlyprice.save()

            DailyhistoryData = requests.get(f'https://api.tdameritrade.com/v1/marketdata/{symbolName}/pricehistory?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&periodType=month&period=2&frequencyType=daily&frequency=1')
            Dailyhistory = DailyhistoryData.json()
            if 'candles' in Dailyhistory.keys() :
                dailycandles = Dailyhistory['candles']
                if(len(dailycandles)>1):
                    for candle in dailycandles:
                        # print(symbolName, candle['volume'])
                        dailyprice  = DailyPriceHistory(
                            symbol = symbolName,
                            volume = candle['volume'],
                            high = candle['high'],
                            low = candle['low'],
                            open = candle['open'],
                            datetime = candle['datetime'],
                            close = candle['close']
                        )
                        dailyprice.save()

            WeeklyhistoryData = requests.get(f'https://api.tdameritrade.com/v1/marketdata/{symbolName}/pricehistory?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&periodType=month&period=6&frequencyType=weekly&frequency=1')
            Weeklyhistory = WeeklyhistoryData.json()
            if 'candles' in Weeklyhistory.keys() :
                weeklycandles = Weeklyhistory['candles']
                if(len(weeklycandles)>1):
                    for candle in weeklycandles:
                        # print(symbolName, candle['volume'])
                        weeklyprice  = WeeklyPriceHistory(
                            symbol = symbolName,
                            volume = candle['volume'],
                            high = candle['high'],
                            low = candle['low'],
                            open = candle['open'],
                            datetime = candle['datetime'],
                            close = candle['close']
                        )
                        weeklyprice.save()

            MonthlyhistoryData = requests.get(f'https://api.tdameritrade.com/v1/marketdata/{symbolName}/pricehistory?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&periodType=year&period=1&frequencyType=monthly&frequency=1')
            Monthlyhistory = MonthlyhistoryData.json()
            if 'candles' in Monthlyhistory.keys() :
                monthlycandles = Monthlyhistory['candles']
                if(len(monthlycandles)>1):
                    for candle in monthlycandles:
                        # print(symbolName, candle['volume'])
                        monthlyprice  = MonthlyPriceHistory(
                            symbol = symbolName,
                            volume = candle['volume'],
                            high = candle['high'],
                            low = candle['low'],
                            open = candle['open'],
                            datetime = candle['datetime'],
                            close = candle['close']
                        )
                        monthlyprice.save()
                
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

        if method == '0':
            if symbolname != '':
                queryset = HourlyPriceHistory.objects.extra(select={'diff': '(close-open)/open'}).order_by('datetime', 'diff').filter(Q(symbol=symbolname))[offset:end]
            else:
                queryset = HourlyPriceHistory.objects.extra(select={'diff': '(close-open)/open'}).order_by('datetime', 'diff')[offset:end]
        elif method == '1':
            if symbolname != '':
                queryset = HourlyPriceHistory.objects.order_by('datetime', 'volume').filter(Q(symbol=symbolname))[offset:end]
            else:
                queryset = HourlyPriceHistory.objects.order_by('datetime', 'volume')[offset:end]
        elif method == '2':
            if symbolname != '':
                queryset = DailyPriceHistory.objects.extra(select={'diff': '(close-open)/open'}).order_by('datetime', 'diff').filter(Q(symbol=symbolname))[offset:end]
            else:
                queryset = DailyPriceHistory.objects.extra(select={'diff': '(close-open)/open'}).order_by('datetime', 'diff')[offset:end]
        elif method == '3':
            if symbolname != '':
                queryset = DailyPriceHistory.objects.order_by('datetime', 'volume').filter(Q(symbol=symbolname))[offset:end]
            else:
                queryset = DailyPriceHistory.objects.order_by('datetime', 'volume')[offset:end]
        elif method == '4':
            if symbolname != '':
                queryset = WeeklyPriceHistory.objects.extra(select={'diff': '(close-open)/open'}).order_by('datetime', 'diff').filter(Q(symbol=symbolname))[offset:end]
            else:
                queryset = WeeklyPriceHistory.objects.extra(select={'diff': '(close-open)/open'}).order_by('datetime', 'diff')[offset:end]
        elif method == '5':
            if symbolname != '':
                queryset = WeeklyPriceHistory.objects.order_by('datetime', 'volume').filter(Q(symbol=symbolname))[offset:end]
            else:
                queryset = WeeklyPriceHistory.objects.order_by('datetime', 'volume')[offset:end]

        # if symbolname != '':
        #     queryset = PriceHistory.objects.extra(select={'diff': d}).order_by('datetime', 'diff').filter(Q(symbol=symbolname))[offset:end]
        # else:
        #     queryset = PriceHistory.objects.extra(select={'diff': d}).order_by('datetime', 'diff')[offset:end]
        serializer = StockSerializer(instance=queryset, context=serializer_context, many=True)
        return Response(serializer.data)
    
    @api_view(('GET',))
    def getTotalRecords(request):
        symbolname = request.GET['search']
        method = request.GET['method']

        if method == '0':
            if symbolname != '':
                queryset = HourlyPriceHistory.objects.filter(Q(symbol=symbolname)).count()
            else:
                queryset = HourlyPriceHistory.objects.all().count()
        elif method == '1':
            if symbolname != '':
                queryset = HourlyPriceHistory.objects.filter(Q(symbol=symbolname)).count()
            else:
                queryset = HourlyPriceHistory.objects.all().count()
        elif method == '2':
            if symbolname != '':
                queryset = DailyPriceHistory.objects.filter(Q(symbol=symbolname)).count()
            else:
                queryset = DailyPriceHistory.objects.all().count()
        elif method == '3':
            if symbolname != '':
                queryset = DailyPriceHistory.objects.filter(Q(symbol=symbolname)).count()
            else:
                queryset = DailyPriceHistory.objects.all().count()
        elif method == '4':
            if symbolname != '':
                queryset = WeeklyPriceHistory.objects.filter(Q(symbol=symbolname)).count()
            else:
                queryset = WeeklyPriceHistory.objects.all().count()
        elif method == '5':
            if symbolname != '':
                queryset = WeeklyPriceHistory.objects.filter(Q(symbol=symbolname)).count()
            else:
                queryset = WeeklyPriceHistory.objects.all().count()


        return Response(queryset)

    @api_view(('GET',))
    def getPortfolioList(self):
        factory = APIRequestFactory()
        request = factory.get('/')

        serializer_context = {
            'request': Request(request),
        }
        queryset = PortfolioList.objects.all()
        serializer = PortfolioSerializer(instance=queryset, context=serializer_context, many=True)
        return Response(serializer.data)



    @api_view(('GET',))
    def getPortfolioSymbolList(request):
        portfolio = request.GET['portfolio']
        serializer_context = {
            'request': request,
        }
        queryset = PortfolioSymbolList.objects.filter(Q(portfolio=portfolio))
        serializer = PortfolioSymbolSerializer(instance=queryset, context=serializer_context, many=True)
        return Response(serializer.data)

    @api_view(['POST'])
    def addPortfolio(request):
        portfolio = request.data['portfolio']

        queryset = PortfolioList.objects.filter(Q(portfolio=portfolio)).distinct()
        if queryset:
            print("exist")
        else:
            data = PortfolioList(
                portfolio = request.data['portfolio']
            )
            data.save()

        return Response()

    @api_view(['POST'])
    def addPortfolioSymbol(request):

        data = PortfolioSymbolList(
            portfolio = request.data['portfolio'],
            symbol = request.data['symbol'],
            quantity = request.data['quantity'],
            entry = request.data['entry'],
        )
        data.save()

        return Response()

    @api_view(['POST'])
    def updatePortfolioSymbol(request):
        queryset = PortfolioSymbolList.objects.get(id=request.data['id'])
        queryset.symbol = request.data['symbol']
        queryset.quantity = request.data['quantity']
        queryset.entry = request.data['entry']
        queryset.save()
        return Response()

    @api_view(['POST'])
    def deletePortfolioSymbol(request):
        PortfolioSymbolList.objects.filter(Q(id=request.data['id'])).delete()
        return Response()

    @api_view(['POST'])
    def deletePortfolio(request):
        PortfolioList.objects.filter(Q(portfolio=request.data['portfolio'])).delete()
        PortfolioSymbolList.objects.filter(Q(portfolio=request.data['portfolio'])).delete()
        return Response()

    @api_view(('GET',))
    def addCurrentPrice(self):
        end = int(time()*1000)
        start = end - 200000000
        print(start, end)
        res = requests.get('https://api.iextrading.com/1.0/ref-data/symbols')
        data = res.json()

        for d in data:
            symbolName = d['symbol']
            HourlyhistoryData = requests.get(f'https://api.tdameritrade.com/v1/marketdata/{symbolName}/pricehistory?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&periodType=day&period=1&frequencyType=minute&frequency=30&endDate={end}&startDate={start}')
            hourlyhistory = HourlyhistoryData.json()
            print(hourlyhistory)
            if 'candles' in hourlyhistory.keys() :
                hourlycandles = hourlyhistory['candles']
                if(len(hourlycandles)>1):
                    for candle in hourlycandles:
                        # print(symbolName, candle['volume'])
                        hourlyprice  = HourlyPriceHistory(
                            symbol = symbolName,
                            volume = candle['volume'],
                            high = candle['high'],
                            low = candle['low'],
                            open = candle['open'],
                            datetime = candle['datetime'],
                            close = candle['close']
                        )
                        hourlyprice.save()

            DailyhistoryData = requests.get(f'https://api.tdameritrade.com/v1/marketdata/{symbolName}/pricehistory?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&periodType=month&period=1&frequencyType=daily&frequency=1&endDate={end}&startDate={start}')
            Dailyhistory = DailyhistoryData.json()
            if 'candles' in Dailyhistory.keys() :
                dailycandles = Dailyhistory['candles']
                if(len(dailycandles)>1):
                    for candle in dailycandles:
                        # print(symbolName, candle['volume'])
                        dailyprice  = DailyPriceHistory(
                            symbol = symbolName,
                            volume = candle['volume'],
                            high = candle['high'],
                            low = candle['low'],
                            open = candle['open'],
                            datetime = candle['datetime'],
                            close = candle['close']
                        )
                        dailyprice.save()

            WeeklyhistoryData = requests.get(f'https://api.tdameritrade.com/v1/marketdata/{symbolName}/pricehistory?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&periodType=month&period=1&frequencyType=weekly&frequency=1&endDate={end}')
            Weeklyhistory = WeeklyhistoryData.json()
            if 'candles' in Weeklyhistory.keys() :
                weeklycandles = Weeklyhistory['candles']
                if(len(weeklycandles)>1):
                    for candle in weeklycandles:
                        # print(symbolName, candle['volume'])
                        weeklyprice  = WeeklyPriceHistory(
                            symbol = symbolName,
                            volume = candle['volume'],
                            high = candle['high'],
                            low = candle['low'],
                            open = candle['open'],
                            datetime = candle['datetime'],
                            close = candle['close']
                        )
                        weeklyprice.save()

            MonthlyhistoryData = requests.get(f'https://api.tdameritrade.com/v1/marketdata/{symbolName}/pricehistory?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&periodType=year&period=1&frequencyType=monthly&frequency=1&endDate={end}')
            Monthlyhistory = MonthlyhistoryData.json()
            if 'candles' in Monthlyhistory.keys() :
                monthlycandles = Monthlyhistory['candles']
                if(len(monthlycandles)>1):
                    for candle in monthlycandles:
                        # print(symbolName, candle['volume'])
                        monthlyprice  = MonthlyPriceHistory(
                            symbol = symbolName,
                            volume = candle['volume'],
                            high = candle['high'],
                            low = candle['low'],
                            open = candle['open'],
                            datetime = candle['datetime'],
                            close = candle['close']
                        )
                        monthlyprice.save()
                
        return Response()