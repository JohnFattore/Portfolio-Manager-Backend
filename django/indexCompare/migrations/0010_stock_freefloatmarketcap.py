# Generated by Django 5.0.4 on 2024-08-04 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('indexCompare', '0009_stock_volumeusd'),
    ]

    operations = [
        migrations.AddField(
            model_name='stock',
            name='freeFloatMarketCap',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=100),
        ),
    ]