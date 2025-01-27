# Generated by Django 5.0.4 on 2025-01-08 00:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0012_rename_buy_asset_buydate_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='asset',
            name='dividends',
            field=models.DecimalField(decimal_places=5, default=0, max_digits=100),
        ),
        migrations.AddField(
            model_name='asset',
            name='reinvestShares',
            field=models.DecimalField(decimal_places=5, default=1, max_digits=25),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='historicalasset',
            name='dividends',
            field=models.DecimalField(decimal_places=5, default=0, max_digits=100),
        ),
        migrations.AddField(
            model_name='historicalasset',
            name='reinvestShares',
            field=models.DecimalField(decimal_places=5, default=1, max_digits=25),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='historicalsnp500price',
            name='dividends',
            field=models.DecimalField(decimal_places=5, default=0, max_digits=100),
        ),
        migrations.AddField(
            model_name='historicalsnp500price',
            name='reinvestShares',
            field=models.DecimalField(decimal_places=5, default=1, max_digits=25),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='snp500price',
            name='dividends',
            field=models.DecimalField(decimal_places=5, default=0, max_digits=100),
        ),
        migrations.AddField(
            model_name='snp500price',
            name='reinvestShares',
            field=models.DecimalField(decimal_places=5, default=1, max_digits=25),
            preserve_default=False,
        ),
    ]
