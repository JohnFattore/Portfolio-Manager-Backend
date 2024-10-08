# Generated by Django 4.1.4 on 2023-01-06 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0002_allocation'),
    ]

    operations = [
        migrations.AddField(
            model_name='allocation',
            name='percent_allocated',
            field=models.DecimalField(decimal_places=2, default=45.4, max_digits=5),
            preserve_default=False,
        ),
    ]
