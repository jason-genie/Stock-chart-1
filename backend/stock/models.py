from django.db import models

# Create your models here.
class PriceHistory(models.Model):

   symbol = models.CharField(max_length = 50)
   volume = models.FloatField()
   high = models.FloatField()
   low = models.FloatField()
   open = models.FloatField()
   datetime = models.IntegerField()

   class Meta:
      db_table = "price_history"    

class SymbolList(models.Model):
   
   symbol = models.CharField(max_length = 50, unique=True)

   class Meta:
      db_table = "symbol_list"
