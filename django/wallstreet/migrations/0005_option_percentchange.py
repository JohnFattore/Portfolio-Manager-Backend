# Generated by Django 4.1.7 on 2024-03-24 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wallstreet', '0004_alter_option_endprice_alter_option_rank_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='option',
            name='percentChange',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
    ]
