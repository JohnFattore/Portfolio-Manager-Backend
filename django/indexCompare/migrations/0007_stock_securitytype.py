# Generated by Django 5.0.4 on 2024-07-16 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('indexCompare', '0006_rename_country_stock_countryhq_stock_countryincorp'),
    ]

    operations = [
        migrations.AddField(
            model_name='stock',
            name='securityType',
            field=models.CharField(default='Common Stock', max_length=1000),
        ),
    ]