# Generated by Django 5.0.4 on 2024-07-31 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('indexCompare', '0008_stock_freefloat_stock_volume'),
    ]

    operations = [
        migrations.AddField(
            model_name='stock',
            name='volumeUSD',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=100),
        ),
    ]
