# Generated by Django 2.2.10 on 2020-09-29 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0004_auto_20200928_2317'),
    ]

    operations = [
        migrations.AlterField(
            model_name='symbollist',
            name='symbol',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]