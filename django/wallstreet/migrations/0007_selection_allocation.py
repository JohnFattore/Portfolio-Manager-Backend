# Generated by Django 4.1.7 on 2024-03-30 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wallstreet', '0006_option_benchmark_alter_option_endprice_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='selection',
            name='allocation',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
    ]