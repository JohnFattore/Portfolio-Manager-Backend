# Generated by Django 5.0.4 on 2025-03-29 15:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0020_alter_assetinfo_ticker_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='asset',
            name='ticker',
        ),
        migrations.RemoveField(
            model_name='historicalasset',
            name='ticker',
        ),
        migrations.AlterField(
            model_name='asset',
            name='asset_info',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, to='portfolio.assetinfo'),
            preserve_default=False,
        ),
    ]
