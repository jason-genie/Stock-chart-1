"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from stock.views import UserViewSet
from stock.views import StockViewSet

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('userlist/', UserViewSet.list),
    path('current-user/', UserViewSet.current_user),
    path('update-user/', UserViewSet.update_user),
    path('price-history/add/', StockViewSet.addPriceHistory),
    path('symbol-list/add/', StockViewSet.addSymbolList),
    path('add-symbol/', StockViewSet.addSymbol),
    path('get-symbollist/', StockViewSet.getSymbolList),
    path('get-watchlist/', StockViewSet.getWatchList),
    path('del-symbol/', StockViewSet.deleteSymbol),
    path('get-stock-screen/', StockViewSet.getStockScreen),
    path('get-total-records/', StockViewSet.getTotalRecords),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
