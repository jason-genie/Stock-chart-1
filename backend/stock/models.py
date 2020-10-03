from django.db import models

# Create your models here.
class PriceHistory(models.Model):

   symbol = models.CharField(max_length = 50)
   volume = models.FloatField()
   high = models.FloatField()
   low = models.FloatField()
   open = models.FloatField()
   datetime = models.IntegerField()
   close = models.FloatField()

   class Meta:
      db_table = "price_history"    

class HourlyPriceHistory(models.Model):

   symbol = models.CharField(max_length = 50)
   volume = models.FloatField()
   high = models.FloatField()
   low = models.FloatField()
   open = models.FloatField()
   datetime = models.IntegerField()
   close = models.FloatField()

   class Meta:
      db_table = "hourly_price_history" 

class DailyPriceHistory(models.Model):

   symbol = models.CharField(max_length = 50)
   volume = models.FloatField()
   high = models.FloatField()
   low = models.FloatField()
   open = models.FloatField()
   datetime = models.IntegerField()
   close = models.FloatField()

   class Meta:
      db_table = "daily_price_history"  

class WeeklyPriceHistory(models.Model):

   symbol = models.CharField(max_length = 50)
   volume = models.FloatField()
   high = models.FloatField()
   low = models.FloatField()
   open = models.FloatField()
   datetime = models.IntegerField()
   close = models.FloatField()

   class Meta:
      db_table = "weekly_price_history"  

class MonthlyPriceHistory(models.Model):

   symbol = models.CharField(max_length = 50)
   volume = models.FloatField()
   high = models.FloatField()
   low = models.FloatField()
   open = models.FloatField()
   datetime = models.IntegerField()
   close = models.FloatField()

   class Meta:
      db_table = "monthly_price_history"  

class SymbolList(models.Model):
   
   symbol = models.CharField(max_length = 50, unique=True)

   class Meta:
      db_table = "symbol_list"

class WatchList(models.Model):
   
   symbol = models.CharField(max_length = 50, unique=True)

   class Meta:
      db_table = "watch_list"

class PortfolioList(models.Model):
   
   portfolio = models.CharField(max_length = 50, unique=True)

   class Meta:
      db_table = "portfolio_list"

class PortfolioSymbolList(models.Model):

   portfolio = models.CharField(max_length=50)
   symbol = models.CharField(max_length = 50)
   quantity = models.IntegerField()
   entry = models.FloatField()

   class Meta:
      db_table = "portfolio_symbol_list"  